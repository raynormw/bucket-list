import React, { Components } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import { styleMenu, styles } from '../styles'

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO =  width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
        {enableHightAccuracy: true, timeout: 5000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    console.log('initialPosition:-----------', this.state.initialPosition)
    console.log('markerPosition:-----------', this.state.markerPosition)
    return (
      <View style={styleMenu.container}>
        <MapView
          style={styleMenu.map}
          initialRegion={this.state.initialPosition}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.markerPosition.latitude,
              longitude: this.state.markerPosition.longitude
            }}
          >
            <View style={styleMenu.radius}>
              <View style={styleMenu.marker}/>
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

export default Maps
