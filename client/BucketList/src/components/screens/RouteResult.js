import React, { Component } from 'react'
import { View } from 'react-native'
import { styleZ, color } from '../styles'
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
      <View style={styleZ.card}>
        
      </View>
      </View>
    )
  }
}

export default RouteResult
