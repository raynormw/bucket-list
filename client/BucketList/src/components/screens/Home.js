import React from 'react'
import {
  Text,
  View
} from 'react-native'

import { styles } from '../styles'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Hello Dog!
        </Text>
        <Text style={styles.instructions}>
          To get started, JUST DO IT!!
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    )
  }
}
