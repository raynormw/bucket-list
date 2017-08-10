import React from 'react'
import {
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { color, styles } from '../styles'

export default class Login extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Login!
        </Text>
        <Icon.Button name="local-grocery-store" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Login with Facebook
        </Icon.Button>
        <Icon.Button name="home" size={30} color={color.black} onPress={() => this.props.navigation.goBack()}>
          Go back home
        </Icon.Button>
      </View>
    )
  }
}
