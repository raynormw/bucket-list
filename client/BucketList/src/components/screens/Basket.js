import React from 'react'
import {
  Text,
  View,
  ListView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios'

import { styles, styleBasket, styleSearch, color } from '../styles'

const API = 'http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api'

export default class Basket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: [],
      id: null,
      loading: false,
      loaded: false,
      modalVisible: false,
    }
  }

  _fetchData() {
    Axios.get(API + '/baskets/getitems/2')
    .then((response) => {
      this.setState({compareData: response.data})

      this._getData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  _getData(data) {
    const ds = this.state.dataSource.cloneWithRows(data || [])
    this.setState({'data': ds, loading: false, loaded: true})
    console.log(this.state.data.getRowCount() + ' Row Count testing')
  }

  _postCompare() {
    let data = this.state.compareData
    console.log(data, ' --------COMPARE')

    var items = data.map((dataItem) => {
      return {
        goodId: dataItem.Good.id,
        quantity: dataItem.quantity
      }
    });

    let lat, lng
    navigator.geolocation.getCurrentPosition((position) => {
      lat = parseFloat(position.coords.latitude)
      lng = parseFloat(position.coords.longitude)

      // Axios.post(API + '/stores/nearbystore', {
      //   "location": {
      //     "lat": lat, "lng": lng
      //   },
      //   "items": [
      //     {
      //       "goodId": 1,
      //       "quantity": 1
      //     },
      //     {
      //       "goodId": 5,
      //       "quantity": 1
      //     }
      //   ]
      // })
      Axios.post(API + '/stores/nearbystore', {
        location: {
          lat, lng
        },
        items,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  _deleteItem(goodsId) {
    this.setState({ loading: true })

    Axios.delete(API + '/baskets/2/' + goodsId +'/removeitem', {
      basket_id: 2,
      goods_id: goodsId
    })
    .then((response) => {
      console.log(response)
      this._fetchData()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderProduct(product) {
    return (
      <View style={styleBasket.item}>
        <Image
          source={{ uri: product.Good.url_pict }}
          style={styleBasket.imgStyle}
        />
        <View style={styleBasket.textContainer}>
          <Text style={styleBasket.headingStyle}>{product.Good.name}</Text>
          <Text>Ukuran: {product.Good.goods_size}</Text>
        </View>
        <TouchableOpacity style={styleBasket.clearIcon}
          onPress = {() => {
            this.setState({ id: product.Good.id })
            this._setModalVisible(true)
          }} >
          <Icon
            name="ios-close"
            size={30}
            color='red'
          />
        </TouchableOpacity>
      </View>
    )
  }

  componentWillMount() {
    this.setState({ loading: true })
    this._fetchData()
  }

  render() {
    return (
      <ScrollView style={styleBasket.container}>
        <View style={styleBasket.headerContainer}>
          <Text style={styleBasket.headerText}>Your basket..</Text>
        </View>
        <View style={styleBasket.listContainer}>
          {  this.state.loading &&
            <ActivityIndicator
              animating={this.state.animating}
              size={60}
              color={color.lightBlue}
            />
          }
          { !this.state.loading && this.state.loaded && this.state.data.getRowCount() === 0 &&
            <View style={styles.container}>
              <Text style={styles.notFound}>Your basket is empty :(</Text>
            </View>
          }
          { !this.state.loading && this.state.loaded &&
            <ListView contentContainerStyle={styleBasket.list}
            dataSource={this.state.data}
            enableEmptySections={true}
            renderRow={this._renderProduct.bind(this)}>
            </ListView>
          }
        </View>
        { !this.state.loading && this.state.loaded && this.state.data.getRowCount() !== 0 &&
          <View style={styleBasket.buttonContainer}>
          <Icon.Button name="ios-pricetags-outline" style={styleBasket.button} onPress={() => this._postCompare()}>
            <Text style={styleBasket.headerText}>compare</Text>
          </Icon.Button>
          </View>
        }
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(!this.state.modalVisible)}
          >
           <View style={styleSearch.containerModal}>
            <View style={styleSearch.modalStyle}>
              <Text style={styleSearch.textModal}>Are you sure?</Text>
              <View style={styleSearch.containerButton}>
                <TouchableHighlight style={styleSearch.buttonYes} activeOpacity={0.5} underlayColor={color.lightBlue} onPress={() => {
                  console.log('yes button')
                  this._setModalVisible(!this.state.modalVisible)
                  this._deleteItem(this.state.id)
                  this.setState({ id: null })
                }}>
                  <Text style={styleSearch.textButton}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styleSearch.buttonNo} activeOpacity={0.5} underlayColor={color.orange} onPress={() => {
                  console.log('no button')
                  this._setModalVisible(!this.state.modalVisible)
                }}>
                  <Text style={styleSearch.textButton}>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}
