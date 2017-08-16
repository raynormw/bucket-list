import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { styleZ, color } from '../styles'
import Maps from './Maps'
import RouteMap from './RouteMap'

class RouteResult extends Component {
  render() {
    let stores = this.props.navigation.state.params.stores
    return(
      <View style={styleZ.container}>
        <Maps
          style={{
            flex: 1,
            width: '100%',
            height: 300
          }}
          stores={stores}
        />
      <ScrollView style={styleZ.cardForMap}>
        
      </ScrollView>
      </View>
    )
  }
}

export default RouteResult
