import React from 'react'
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { color, styles, styleMenu } from '../styles'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styleMenu.containerLogin}>
        <View style={styleMenu.logoLoginContainer}>
          <Image
            style={styleMenu.logo}
            source={require('../../asset/logo/price-tag-percent.png')}
          />
          <Text style={styleMenu.title}>PRICE POLICE</Text>
        </View>
        <Text style={styleMenu.headerText}>REGISTER</Text>
      <View style={styleMenu.registerFrom}>
        <TextInput
          style={styleMenu.registerInput}
          placeholder="Fullname"
          placeholderTextColor="rgba(255,255,255,0.8)"
          placeholderStyle={{paddingLeft: 25}}
          underlineColorAndroid="transparent"
          returnKeyType="next"
        />
        <TextInput
          style={styleMenu.registerInput}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid="transparent"
          returnKeyType="next"
        />
        <TextInput
          style={styleMenu.registerInput}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="next"
        />
        <TextInput
          style={styleMenu.registerInput}
          placeholder="Password (enter again)"
          placeholderTextColor="rgba(255,255,255,0.8)"
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="next"
        />
      </View>
      <View style={styleMenu.registerFrom}>
        <TouchableOpacity style={styleMenu.buttonContainer}>
          <Text style={styleMenu.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <Icon.Button name="user" size={25} backgroundColor="#3b3898" onPress={() => this.props.navigation.navigate('LittleMaps')}>Maps</Icon.Button>
      <Icon.Button name="user" size={25} backgroundColor="#3b3898" onPress={() => this.props.navigation.navigate('DetailProduct')}>Maps</Icon.Button>
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
