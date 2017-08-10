import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { color } from '../styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default class Product extends React.Component {
  // static navigationOptions = {
  //   title: 'Bucket List',
  //   headerStyle: {
  //     backgroundColor: color.lightBlue,
  //   },
  //   headerTintColor: color.white
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Product!
        </Text>
        <Icon.Button name="home" size={30} color={color.black} onPress={() => this.props.navigation.goBack()}
        title="Go back home"/>
        {/* <Text style={styles.instructions}>
          To get started, JUST DO IT!!
          </Text>
          <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text> */}
      </View>
    )
  }
}
