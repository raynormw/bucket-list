import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ActivityIndicator
 } from 'react-native'
 import Axios from 'axios'

 import { styleZ, color } from '../styles'
 import LittleMaps from './LittleMaps'
 import API from '../utils/index'

class DetailProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datas: [],
    }
  }

  componentWillMount() {
    let items = this.props.navigation.state.params.items
    let lat, lng
    navigator.geolocation.getCurrentPosition((position) => {
      lat = parseFloat(position.coords.latitude)
      lng = parseFloat(position.coords.longitude)

      Axios.post(API + '/stores/nearbystore', {
        location: {
          lat, lng
        },
          items,
      })
      .then((response) => {
        console.log(response, 'RESPONSE NEAR BY STORE')
        this._getData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  _getData(data) {
    this.setState({datas: data})
  }

  render() {
    const {navigate} = this.props.navigation

    let datas = this.state.datas.mostOptimizedMatrix ? this.state.datas.mostOptimizedMatrix.stores : [];
    let unMatchGoods = this.state.datas.unMatchGoods ? this.state.datas.unMatchGoods : [];
    console.log('--------------', unMatchGoods);
    return (
      <ScrollView style={styleZ.container}>
        {datas.length === 0 && unMatchGoods.length === 0 &&
          <ActivityIndicator
              animating={true}
              size={60}
              color={color.lightBlue}
            />
        }
        {datas.length > 0 &&
          <View style={{ margin: 10, backgroundColor: color.black, borderColor: color.gray, borderRadius: 6, padding: 15, flex: 1, justifyContent: 'space-between', }}>
            <Text style={{ color: color.white, }}>Total Cost: </Text><Text style={{ color: color.white, fontWeight: 'bold' }}>Rp. {this.state.datas.mostOptimizedMatrix.storesOptimizedTotal}</Text>
            <Text style={{ color: color.white }}>Total Cost and Distance: </Text><Text style={{ color: color.white, fontWeight: 'bold' }}>Rp. {this.state.datas.mostOptimizedMatrix.storesOptimizedTotalWithDistance}</Text>
          </View>
        }
        {unMatchGoods.map((good, index) => (
          <View style={styleZ.card} key={index}>
              <Text style={{ color: 'red', margin: 10, fontWeight: 'bold' }}>Not Available: {good.name}</Text>
          </View>
        ))}
        {datas.map((store, index) => (
        <View style={styleZ.card} key={index}>
          <View style={styleZ.cardHeader}>
            <Image source={require('../../assets/logo/online-store.png')} style={{width: 30, height: 30, margin: 5}}/>
          <Text style={styleZ.cardTextHeader}>{store.name}</Text>
          </View>
          <View style={styleZ.cardMap}>
            <LittleMaps lat={+store.location.lat} lng={+store.location.lng}/>
          </View>
          {store.items.map((item, index) => (
          <View style={styleZ.cardList} key={index}>
            <View style={styleZ.cardListItem}>
              <Image style={styleZ.cardListItemImage} source={require('../../assets/logo/bag.png')}/>
              <View style={styleZ.cardListItemDetail}>
                <Text style={item._selected ? styleZ.cardListItemDetailProductNameSelected : styleZ.cardListItemDetailProductName}>
                  {item.good.name}
                </Text>
                <View style={styleZ.cardListItemDetailPriceQty}>
                    <Text style={styleZ.cardListItemDetailPriceContent}>Rp. {item.price}</Text>
                    <Text style={styleZ.cardListItemDetailQtyContent}>{item.quantity}pcs</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        </View>
      ))}
      { datas.length > 0 &&
        <TouchableOpacity style={styleZ.buttonGetRoute} onPress={() => navigate('RouteResult', {stores: datas})}>
          <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 35}}>Get Route</Text>
        </TouchableOpacity>
      }
      </ScrollView>
    )
  }
}

export default DetailProduct
