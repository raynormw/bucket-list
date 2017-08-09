import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, Button, Text } from 'react-native'

class SearchMenu extends Component{
    render() {
        return (
            <View style={StyleSheet.container}>
                <TextInput 
                    placeholder='Cari Produk...'
                />
                <Button 
                    title='ompare'
                />
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

export default SearchMenu