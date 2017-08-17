import React from 'react'
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { color, styles, styleZ } from '../styles'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styleZ.containerLogin}>
        <View style={styleZ.logoLoginContainer}>
          <Image
            style={styleZ.logo}
            source={require('../../assets/logo/price-tag-percent.png')}
          />
        <Text style={styleZ.title}>PRICE POLICE</Text>
        </View>
        <Text style={styleZ.headerText}>REGISTER</Text>
      <View style={styleZ.registerFrom}>
        <TextInput
          style={styleZ.registerInput}
          placeholder="Fullname"
          placeholderTextColor="rgba(255,255,255,0.8)"
          placeholderStyle={{paddingLeft: 25}}
          underlineColorAndroid="transparent"
          returnKeyType="next"
        />
        <TextInput
          style={styleZ.registerInput}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid="transparent"
          returnKeyType="next"
        />
        <TextInput
          style={styleZ.registerInput}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="next"
        />
        <TextInput
          style={styleZ.registerInput}
          placeholder="Password (enter again)"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="next"
        />
      </View>
      <View style={styleZ.registerFrom}>
        <TouchableOpacity style={styleZ.buttonContainer}>
          <Text style={styleZ.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
        {/* <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Register with Facebook
        </Icon.Button>
        <Icon.Button name="home" size={30} color={color.black} onPress={() => this.props.navigation.goBack()}>
          Go back home
        </Icon.Button>
        <Icon.Button name="user" size={25} backgroundColor="#3b3898" onPress={() => this.props.navigation.navigate('Maps')}>Maps</Icon.Button> */}
      </View>
    )
  }
}
