import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { styleZ, color, styleBasket } from '../styles'
import Maps from './Maps'

class RouteResult extends Component {
  render() {
    return(
      <View style={styleZ.container}>
        <Maps
          style={{
            flex: 1,
            width: '100%',
            height: 300
          }}
          stores={this.props.navigation.state.params.stores}
        />
      <ScrollView style={{ flex: 2}}>
        <View style={styleBasket.headerContainer}>
          <Text style={styleBasket.headerText}>Route Detail  ...</Text>
        </View>
        <View style={styleZ.cardForMap}>
          <Image style={styleZ.cardForMapToImage} source={require('../../assets/logo/girl.png')} />
          <View style={styleZ.cardForMapToDetail}>
            <Text style={styleZ.cardForMapToDetailText}>Your Position</Text>
          </View>
        </View>
        {this.props.navigation.state.params.stores.map((store, index) => (
        <View style={styleZ.cardForMap} key={index}>
          <Image style={styleZ.cardForMapToImage} source={require('../../assets/logo/online-store.png')} />
          <View style={styleZ.cardForMapToDetail}>
            <Text style={styleZ.cardForMapToDetailText}>{store.name}</Text>
          </View>
        </View>
        ))}
      </ScrollView>
      </View>
    )
  }
}

export default RouteResult
