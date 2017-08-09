import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Card, CardItem } from 'native-base'

class RouteMenu extends Component {
    render () {
        return (
            <View>
                <Card></Card>
                <Image></Image>
                <Button></Button>
            </View>
        )
    }
}

const Styles = StyleSheet({
    container: {
        flex: 1,
        alignItem: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}) 

export default RouteMenu