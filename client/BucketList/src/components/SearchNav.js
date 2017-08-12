import React from 'react'
import {
  TextInput,
  View,
  TouchableOpacity
 } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { styleSearch, color } from './styles'

export default class SearchNav extends React.Component {
  render() {
    return (
      <View style={styleSearch.headerContainer}>
        <TouchableOpacity style={styleSearch.backContainer}
          onPress = {() => this.props.navigation.goBack()} >
          <Icon name="ios-arrow-back" size={30} color={color.black}/>
        </TouchableOpacity>
        <View style={styleSearch.searchBoxContainer}>
          <Icon
            name="ios-search"
            size={30}
            style={styleSearch.searchIcon} />
          <TextInput style={styleSearch.searchText}
            placeholder='Search an item..'
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            // value={this.props.user}
            // onChangeText={(query) => this.setState({ query })}
          />
        </View>

      </View>
    )
  }
}
