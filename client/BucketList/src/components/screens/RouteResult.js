import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { styleZ, color, styleBasket } from '../styles'
import Maps from './Maps'
import getDirections from 'react-native-google-maps-directions'

class RouteResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        lat: 0,
        lng: 0
      },
      home: {
        lat: 0,
        lng: 0
      }
    }
  }

  componentWillMount() {
    const currentPosition = { lat: 0, lng: 0 }
    navigator.geolocation.getCurrentPosition((position) => {
      currentPosition.lat = parseFloat(position.coords.latitude)
      currentPosition.lng = parseFloat(position.coords.longitude)

      this.setState({position: currentPosition})
    }, (error) => alert(error.message), {enableHightAcuracy: true, timeout: 40000})
  }

  _openMap(location) {
    console.log(this.state.home, 'Location-------------')
    let data = {
       source: {
        latitude: this.state.position.lat,
        longitude: this.state.position.lng
      },
      destination: {
        latitude: Number(location.lat),
        longitude: Number(location.lng)
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }
    getDirections(data)
  }

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
        {this.props.navigation.state.params.stores.map((store, index) => (
        <TouchableOpacity style={styleZ.cardForMap} key={index} onPress={() => {this._openMap(store.location)}}>
          <Image style={styleZ.cardForMapToImage} source={require('../../assets/logo/online-store.png')} />
          <View style={styleZ.cardForMapToDetail}>
            <Text style={styleZ.cardForMapToDetailText}>{store.name}</Text>
          </View>
        </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    )
  }
}

export default RouteResult
