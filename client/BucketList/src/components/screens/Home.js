import React from 'react'
import {
  Text,
  View
} from 'react-native'

import { styleMenu } from '../styles'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styleMenu.container}>
        <View style={[styleMenu.boxContainer, styleMenu.banner]}>
          <Text>Test</Text>
        </View>
        <View style={[styleMenu.boxContainer, styleMenu.search]}>
          <Text>Test</Text>
        </View>
        <View style={[styleMenu.boxContainer, styleMenu.products]}>
          <Text>Test</Text>
        </View>
      </View>
    )
  }
}
