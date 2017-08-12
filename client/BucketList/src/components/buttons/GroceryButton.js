import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { styles } from '../styles'

const GroceryButton = ({nav}) => (
  <TouchableOpacity
    onPress = {() => nav.navigate('Product')} >
    <Icon name="local-grocery-store" size={25} style={styles.groceryButton} />
  </TouchableOpacity>
)

export default GroceryButton