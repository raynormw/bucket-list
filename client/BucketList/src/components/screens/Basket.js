import React from 'react'
import {
  Text,
  View,
  ListView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios'

import { styles, styleBasket, color } from '../styles'

const API = 'http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api'

export default class Basket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: [],
      loading: false,
      loaded: false,
      modalVisible: false,
    }
  }

  _getData(data) {
    const ds = this.state.dataSource.cloneWithRows(data || [])
    this.setState({'data': ds, loading: false, loaded: true})
    console.log(this.state.data.getRowCount() + ' Row Count testing')
  }

  _deleteItem(goodsId) {
    console.log(goodsId + ' goods ID ----')
    Axios.delete(API + '/baskets/2/' + goodsId +'/removeitem', {
      basket_id: 2,
      goods_id: goodsId
    })
    .then((response) => {
      console.log(response)
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
          onPress = {() => this._deleteItem(product.Good.id)} >
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

    Axios.get(API + '/baskets/getitems/2')
    .then((response) => {
      console.log(response)
      this._getData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
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
          <Icon.Button name="ios-pricetags-outline" style={styleBasket.button} onPress={() => console.log('compare success')}>
            <Text style={styleBasket.headerText}>compare</Text>
          </Icon.Button>
          </View>
        }
      </ScrollView>
    )
  }
}
