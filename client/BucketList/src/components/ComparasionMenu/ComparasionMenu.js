import React, { Component } from 'react'
import { View, StyleSheet, Image, Button } from 'react-native'
import { Card, CardItem } from 'native-base'

class ComparasionMenu extends Component {
    render() {
        return(
            <View style={Styles.container}>
                <Card>
                   <CardItem>
                        <Image />
                   </CardItem>
                   <CardItem>
                        <Button />
                   </CardItem> 
                </Card>
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

export default ComparasionMenu