import React from 'react'
import { Text, View } from 'react-native'

import { styleSearch } from '../styles'
import SearchNav from '../SearchNav'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query : '',
      data: [
        {
          id: 1,
          productName: 'Beras Maknyuss',
          productPrice: 60000,
          storeName: 'Alfamart'
        },
        {
          id: 2,
          productName: 'Minyak goreng Bimoli',
          productPrice: 33000,
          storeName: 'Indomaret'
        },
        {
          id: 3,
          productName: 'Gulaku Premium',
          productPrice: 17000,
          storeName: 'Carrefour'
        },
        {
          id: 4,
          productName: 'Susu Childkid',
          productPrice: 34000,
          storeName: 'Giant'
        }
      ]
    }
  }

  render() {
    console.log(this.state)
    console.log(this.state.search)
    return (
      <View style={styleSearch.container}>
        <SearchNav navigation = {this.props.navigation}/>
        <View style={styleSearch.listContainer}>
          <Text>Hasil Query: {this.state.query}</Text>
        </View>
      </View>
    )
  }
}
