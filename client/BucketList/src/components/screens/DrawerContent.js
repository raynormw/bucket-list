import React from 'react'
import { View } from 'react-native'
import { DrawerItems } from 'react-navigation'

import { styles } from '../styles'


export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={[styles.boxContainer, styles.header]}>
        </View>
        <View style={[styles.boxContainer, styles.main]}>
          <DrawerItems {...this.props} />
        </View>
        <View style={[styles.boxContainer, styles.footer]}>
        </View>
      </View>
    );
  }
}
