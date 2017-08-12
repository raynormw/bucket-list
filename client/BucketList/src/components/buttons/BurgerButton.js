import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { styles } from '../styles'

const BurgerButton = ({nav}) => (
  <TouchableOpacity
    onPress = {() => nav.navigate('DrawerOpen')} >
    <Icon name="navicon" size={25} style={styles.burgerButton} />
  </TouchableOpacity>
)

export default BurgerButton
