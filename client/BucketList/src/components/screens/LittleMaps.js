import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import Polyline from '@mapbox/polyline'
import { styleMenu, styles, color } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO =  width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class LittleMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
        latitude: -6.16074,
        longitude: 106.582024,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
  }

  componentWillMount () {
    // console.log(JSON.stringify(this.props))
    // let coord = JSON.stringify(this.props)
    // console.log('------------', coord)
    // this.setState({latitude: coord.lat})
    // this.setState({longitude: coord.lng})
    // console.log('ini state-------------------' +this.state)
  }

  marker() {
    return {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }
  }

  render() {
    return(
      <View style={styleMenu.container}>
        <MapView
          style={styleMenu.map}
          initialRegion={this.state}
          zoomEnabled={true}
        >
          <MapView.Marker
            coordinate={this.marker()}
          >
            <Icon name="map-marker" size={40} style={{color: '#3A539B'}} />
          </MapView.Marker>
        </MapView>
      </View>
    )
  }
}

export default LittleMaps
