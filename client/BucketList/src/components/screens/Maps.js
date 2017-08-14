import React, { Components } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import Polyline from '@mapbox/polyline'
import { styleMenu, styles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO =  width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

var dummyDataForMarkers = [{
  title: 'Alfamart1',
  latitude: -6.2590744,
  longitude: 106.7817552
}, {
  title: 'Alfamart2',
  latitude: -6.2592594,
  longitude: 106.7804599
}, {
  title: 'Indomaret1',
  latitude: -6.2607187,
  longitude: 106.7772388
}, {
  title: 'Indomaret2',
  latitude: -6.2505417,
  longitude: 106.777047
}]

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
      },
      coordDirections: []
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

    var coordGroups = []
    var promises = []

    for(let i=0; i<dummyDataForMarkers.length; i++) {
      if(i < dummyDataForMarkers.length - 1){

        const promise = new Promise((resolve, reject) => {
          let startPos = `${dummyDataForMarkers[i].latitude},${dummyDataForMarkers[i].longitude}`
          let destinationPos = `${dummyDataForMarkers[i+1].latitude},${dummyDataForMarkers[i+1].longitude}`

          fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startPos }&destination=${ destinationPos }`)
          .then((result) => {
            let respJson = result.json()
            .then((mypromise) => {
              console.log('------------1', mypromise);
              let points = Polyline.decode(mypromise.routes[0].overview_polyline.points)
              console.log('--------------2', points);
              let coords = points.map((point, index) => {
                return {
                  latitude: point[0],
                  longitude: point[1]
                }
              })
              console.log('-----------coords', coords);
              resolve(coords);
            })
          })
        })
        promises.push(promise);
      }
    }
    Promise.all(promises)
    .then((data) => {
      console.log('----------data', data);
      this.setDirectionMethode(data)
    })
  }

  setDirectionMethode(data) {
    this.setState({coordDirections: data})
    console.log('--------------4', this.state.coordDirections);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    //console.log('---------ini data',this.state.coordDirections)
    return (
      <View style={styleMenu.container}>
        <MapView
          style={styleMenu.map}
          initialRegion={this.state.initialPosition}
          showsUserLocation={true}
          showsCompass={true}
          zoomEnabled={true}
        >
          {dummyDataForMarkers.map((data, index) => (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude
            }}
            title={data.title}
          >
            <Icon name="map-marker" size={40} style={{color: '#3A539B'}} />
          </MapView.Marker>
          ))}
          {this.state.coordDirections.map((direction, index) => (
              <MapView.Polyline
                key={index}
                coordinates={direction}
                strokeWidth={2}
                strokeColor="red"
              />
            )
          )}
        </MapView>
      </View>
    );
  }
}

export default Maps