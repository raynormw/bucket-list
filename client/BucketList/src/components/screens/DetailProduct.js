import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
 } from 'react-native'
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
 import { style, styleMenu, color } from '../styles'
 import LittleMaps from './LittleMaps'
 import data from '../../asset/data/dummy'

class DetailProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: [],
      stores: data.mostOptimizedMatrix.stores
    }
  }

  componentWillMount() {
    console.log('----------------data', this.state.stores);
    var storeRegions = []
    var dataRegion = data.mostOptimizedMatrix.stores.map((storeRegion, index) => {
      return {
        latitude: storeRegion.location.lat,
        longitude: storeRegion.location.lng
      }
    })
    storeRegions.push(dataRegion)
    this.setState({region: storeRegions})
  }

  render() {
    return (
      <ScrollView style={styleMenu.container}>
        {this.state.stores.map((store, index) => (
        <View style={styleMenu.card} key={index}>
          <View style={styleMenu.cardHeader}>
            <Image source={require('../../asset/logo/online-store.png')} style={{width: 30, height: 30, margin: 5}}/>
            <Text style={styleMenu.cardTextHeader}>{store.name}</Text>
          </View>
          <View style={styleMenu.cardMap}>
            <LittleMaps lat={+store.location.lat} lng={+store.location.lng}/>
          </View>
          {store.items.map((item, index) => (
          <View style={styleMenu.cardList} key={index}>
            <View style={styleMenu.cardListItem}>
              <Image style={styleMenu.cardListItemImage} source={require('../../asset/logo/bag.png')}/>
              <View style={styleMenu.cardListItemDetail}>
                <Text style={styleMenu.cardListItemDetailProductName}>
                  {item.good.name}
                </Text>
                <View style={styleMenu.cardListItemDetailPriceQty}>
                    <Text style={styleMenu.cardListItemDetailPriceContent}>Rp. {item.price}</Text>
                    <Text style={styleMenu.cardListItemDetailQtyContent}>{item.quantity}pcs</Text>
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
