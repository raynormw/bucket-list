import React from 'react'
import {
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { color, styles } from '../styles'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Register!
        </Text>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Register with Facebook
        </Icon.Button>
        <Icon.Button name="home" size={30} color={color.black} onPress={() => this.props.navigation.goBack()}>
          Go back home
        </Icon.Button>
        <Icon.Button name="user" size={25} backgroundColor="#3b3898" onPress={() => this.props.navigation.navigate('Maps')}>Maps</Icon.Button>
      </View>
    )
  }
}
