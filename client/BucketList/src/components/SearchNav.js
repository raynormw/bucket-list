import React from 'react'
import {
  TextInput,
  View,
  TouchableOpacity
 } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { styleSearch, color } from './styles'

export default class SearchNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query : '',
      edit: false
    }
  }

  _handleSubmit() {
    this.props.handleQuery(this.state.query)
    this.setState({query: '', edit: false})
  }

  _handleClear() {
    this.setState({query: '', edit: false})
  }

  render() {
    console.log(this.state, 'State in SearchNav');
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
            style={styleSearch.searchIcon}
           />
          <TextInput style={styleSearch.searchText}
            placeholder='Search an item..'
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='search'
            value={this.state.query}
            onEndEditing={this._handleSubmit.bind(this)}
            onChangeText={(query) => this.setState({ query, edit: true })}
          />
          {  this.state.edit &&
            <Icon
              name="ios-close"
              size={25}
              color='red'
              style={styleSearch.clearIcon}
              onPress = {this._handleClear.bind(this)}
             />
          }
        </View>
      </View>
    )
  }
}
