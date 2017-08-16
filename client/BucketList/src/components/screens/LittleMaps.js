import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import Polyline from '@mapbox/polyline'
import { styleZ, color } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO =  width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class LittleMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
  }

  marker() {
    return {
      latitude: this.props.lat,
      longitude: this.props.lng
    }
  }

  render() {
    console.log('---------------Props', JSON.stringify(this.props))
    return(
      <View style={styleZ.container}>
        <MapView
          style={styleZ.map}
          initialRegion={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
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
