import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
 } from 'react-native'
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
 import { styleZ, color } from '../styles'
 import LittleMaps from './LittleMaps'
 import data from '../../assets/data/dummy'

class DetailProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: [],
      stores: data.mostOptimizedMatrix.stores
    }
  }

  componentWillMount() {
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
