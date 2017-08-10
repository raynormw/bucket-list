import React from 'react'
import {
  Text,
  View,
  ScrollView,
  Button
} from 'react-native'

const styles = {
  container: {
  flex: 1,
  padding: 20,
  backgroundColor: 'Green',
  },
};

export default class DrawerContent extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Button title="Change Emails">

          </Button>
        </View>
      </ScrollView>
    );
  }
}

<DrawerItems {...this.props}  activeTintColor='#2196f3' activeBackgroundColor='rgba(0, 0, 0, .04)' inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' style={{backgroundColor: '#000000'}} labelStyle={{color: '#ffffff'}}/>
