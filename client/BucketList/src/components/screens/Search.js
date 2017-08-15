import React from 'react'
import {
  Text,
  View,
  ScrollView,
  ListView,
  Image,
  TouchableHighlight,
  Modal
 } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Axios from 'axios'

import { styleSearch, color } from '../styles'
import SearchNav from '../SearchNav'

const API = 'https://f05bd451.ngrok.io/api'

const data = [
  {
    id: 1,
    name: 'Beras Maknyuss',
    productPrice: 60000,
    goods_size: 'Ukuran 5Kg',
    storeName: 'Alfamart',
    url_pict: require('../../assets/berasCrop.png')
  },
  {
    id: 2,
    name: 'Minyak goreng Bimoli',
    productPrice: 33000,
    goods_size: "Ukuran 2liter",
    storeName: 'Indomaret',
    url_pict: require('../../assets/minyakCrop.png')
  },
  {
    id: 3,
    name: 'Gulaku Premium',
    productPrice: 17000,
    goods_size: 'Ukuran 1Kg',
    storeName: 'Carrefour',
    url_pict: require('../../assets/gulaCrop.png')
  },
  {
    id: 4,
    name: 'Susu Childkid',
    productPrice: 34000,
    productSize: 'Ukuran 400g',
    storeName: 'Giant',
    url_pict: require('../../assets/chil-kid-vanilla.jpg')
  },
  {
    id: 1,
    productName: 'Beras Maknyuss',
    productPrice: 60000,
    goods_size: 'Ukuran 5Kg',
    storeName: 'Alfamart',
    url_pict: require('../../assets/berasCrop.png')
  },
  {
    id: 2,
    productName: 'Minyak goreng Bimoli',
    productPrice: 33000,
    goods_size: "Ukuran 2liter",
    storeName: 'Indomaret',
    url_pict: require('../../assets/minyakCrop.png')
  },
  {
    id: 3,
    name: 'Gulaku Premium',
    productPrice: 17000,
    goods_size: 'Ukuran 1Kg',
    storeName: 'Carrefour',
    url_pict: require('../../assets/gulaCrop.png')
  },
  {
    id: 4,
    name: 'Susu Childkid',
    productPrice: 34000,
    goods_size: 'Ukuran 400g',
    storeName: 'Giant',
    url_pict: require('../../assets/chil-kid-vanilla.jpg')
  }
]

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      //query : '',
      data: [],
      modalVisible: false,
      loading: false,
      loaded: false
    }
  }

  _handleQuery(query) {
    this.setState({ loading: true })
    console.log(this.state)

    Axios.post(API + '/goods/searchgoods', {
      query: query
    })
    .then((response) => {
      console.log(response)
      this._getData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  _getData(data) {
    const ds = this.state.dataSource.cloneWithRows(data)
    this.setState({'data': ds, loading: false, loaded: true})
    console.log(this.state)
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderProduct(product) {
    return (
      <View style={styleSearch.item}>
        <Text style={styleSearch.headingStyle}>{product.name}</Text>
        <Image
          source={product.url_pict}
          style={styleSearch.imgStyle}
        />
        <Text style={styleSearch.infoStyle}>{product.goods_size}</Text>
        <Icon.Button name="shopping-basket" backgroundColor={color.niceOrange} onPress={() => {
          this._setModalVisible(true)}}>
          Add to basket
        </Icon.Button>
      </View>
    )
  }

  // componentDidMount() {
  //   this._getData(data)
  // }

  render() {
    console.log(this.state, 'State in Search')
    return (
      <ScrollView style={styleSearch.container}>
        <SearchNav navigation={this.props.navigation} handleQuery={this._handleQuery.bind(this)}/>
        <View style={styleSearch.listContainer}>
          {/* <Text>Hasil Query: {this.state.query}</Text> */}
          { !this.state.loading && this.state.loaded &&
            <ListView contentContainerStyle={styleSearch.list}
            dataSource={this.state.data}
            renderRow={this._renderProduct.bind(this)}>
          </ListView>
          }
        </View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => alert("Modal has been closed.")}
          >
           <View style={styleSearch.containerModal}>
            <View style={styleSearch.modalStyle}>
              <Text style={styleSearch.textModal}>Add another?</Text>
              <View style={styleSearch.containerButton}>
                <TouchableHighlight style={styleSearch.buttonYes} activeOpacity={0.5} underlayColor={color.lightBlue} onPress={() => {
                  console.log('yes button')
                  this._setModalVisible(!this.state.modalVisible)
                }}>
                  <Text style={styleSearch.textButton}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styleSearch.buttonNo} activeOpacity={0.5} underlayColor={color.orange} onPress={() => {
                  console.log('no button')
                  this._setModalVisible(!this.state.modalVisible)
                  this.props.navigation.navigate('Basket')
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
