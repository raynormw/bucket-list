import React from 'react'
import {
  Text,
  View,
  ScrollView,
  ListView,
  Image,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
 } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Axios from 'axios'

import { styles, styleSearch, color } from '../styles'
import SearchNav from '../SearchNav'

const API = 'http://ec2-13-59-184-74.us-east-2.compute.amazonaws.com:3000/api'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      animating: true,
      data: [],
      modalVisible: false,
      loading: false,
      loaded: false,
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

  _addToBasket(id) {
    console.log('Product ID ' + id)

    Axios.post(API + '/baskets/2/additem/', {
      basket_id: 2,
      goods_id: id,
      quantity: 1
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  _renderProduct(product) {
    return (
      <View style={styleSearch.item}>
        <Text style={styleSearch.headingStyle}>{product.name}</Text>
        <Image
          source={{ uri: product.url_pict}}
          style={styleSearch.imgStyle}
        />
        <Text style={styleSearch.infoStyle}>Ukuran: {product.goods_size}</Text>
        <Icon.Button name="shopping-basket" backgroundColor={color.niceOrange} onPress={() => {
          this._addToBasket(product.id)
          this._setModalVisible(true)}}>
          Add to basket
        </Icon.Button>
      </View>
    )
  }

  render() {
    console.log(this.state, 'State in Search')
    return (
      <ScrollView style={styleSearch.container}>
        <SearchNav navigation={this.props.navigation} handleQuery={this._handleQuery.bind(this)}/>
        <View style={styleSearch.listContainer}>
          {  this.state.loading &&
            <ActivityIndicator
              animating={this.state.animating}
              size={60}
              color={color.lightBlue}
            />
          }
          { !this.state.loading && this.state.loaded && this.state.data.getRowCount() === 0 &&
            <View style={styles.container}>
              <Text style={styles.notFound}>Uh oh, result not found :(</Text>
            </View>
          }
          { !this.state.loading && this.state.loaded &&
            <ListView contentContainerStyle={styleSearch.list}
            dataSource={this.state.data}
            enableEmptySections={true}
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
