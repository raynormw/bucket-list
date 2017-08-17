import React from 'react'
import {
  Text,
  Alert,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { color, styleZ } from '../styles'

export default class Login extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        email: '',
        password: ''
      }
  }

  loginMethod() {
    if(this.state.email === '' && this.state.password === ''){
      Alert.alert('Email and Password must not empty')
    } else {
      Alert.alert('Success Log')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styleZ.containerLogin}>
        <View style={styleZ.logoLoginContainer}>
          <Image
            style={styleZ.logo}
            source={require('../../assets/logo/price-tag-percent.png')}
          />
        <Text style={styleZ.title}>PRICE POLICE</Text>
        </View>
        <View style={styleZ.formLogin}>
          <TextInput
            placeholder="Valid Email"
            placeholderTextColor="rgba(255,255,255,0.8)"
            underlineColorAndroid='transparent'
            returnKeyType="next"
            onChangeText={(email) => this.setState({email})}
            style={styleZ.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            underlineColorAndroid='transparent'
            secureTextEntry
            returnKeyType="go"
            onChangeText={(password) => this.setState({password})}
            style={styleZ.input}
          />
        <TouchableOpacity style={styleZ.buttonContainer} onPress={() => {this.loginMethod()}}>
            <Text style={styleZ.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleZ.buttonContainer}>
            <Text style={styleZ.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        {/* <Icon.Button name="local-grocery-store" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Login with Facebook
        </Icon.Button>
        <Icon.Button name="home" size={30} color={color.black} onPress={() => this.props.navigation.goBack()}>
          Go back home
        </Icon.Button> */}
      </KeyboardAvoidingView>
    )
  }
}
