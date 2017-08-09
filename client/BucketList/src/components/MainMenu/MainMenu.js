import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity,
    Button,
    Image,
    StyleSheet
 } from 'react-native'
import { Card, Content, CardItem } from 'native-base'

class MainMenu extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <TouchableOpcity>
                    <Button 
                        title='Cari Product...'
                        color='#f6846a'
                    />
                </TouchableOpcity>
                <Card>
                    <CardItem>
                        <Image 
                            source={{uri: 'http://wallpapercave.com/wp/wp1862247.png'}}
                        />
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

export default MainMenu