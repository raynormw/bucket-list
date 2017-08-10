import React from 'react'
import { AppRegistry } from 'react-native'

import App from './src/components/App'

export default class BucketList extends React.Component {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('BucketList', () => BucketList);
