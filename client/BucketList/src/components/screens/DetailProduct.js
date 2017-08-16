import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
 } from 'react-native'
 import Axios from 'axios'

 import { styleZ } from '../styles'
 import LittleMaps from './LittleMaps'

const API = 'http://ec2-18-220-197-230.us-east-2.compute.amazonaws.com:3000/api'

class DetailProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stores: [],
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
    let dataRegion = data.mostOptimizedMatrix.stores.map((storeRegion) => {
      return {
        latitude: storeRegion.location.lat,
        longitude: storeRegion.location.lng
      }
    })
    this.setState({stores: dataRegion})
  }
  //   let storeRegions = []
  //   let dataRegion = data.mostOptimizedMatrix.stores.map((storeRegion) => {
  //     return {
  //       latitude: storeRegion.location.lat,
  //       longitude: storeRegion.location.lng
  //     }
  //   })
  //   storeRegions.push(dataRegion)
  //   this.setState({region: storeRegions})


  render() {
    return (
      <ScrollView style={styleZ.container}>
        {this.state.stores.map((store, index) => (
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
                <Text style={styleZ.cardListItemDetailProductName}>
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
      </ScrollView>
    )
  }
}

export default DetailProduct
