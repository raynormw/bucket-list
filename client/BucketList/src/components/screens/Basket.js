import React from 'react'
import {
  Text,
  View,
  ListView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { styleBasket } from '../styles'

const data = [
  {
    id: 1,
    productName: 'Beras Maknyuss',
    productPrice: 60000,
    productSize: 'Ukuran 5Kg',
    storeName: 'Alfamart',
    uri: require('../../assets/berasCrop.png')
  },
  {
    id: 2,
    productName: 'Minyak goreng Bimoli',
    productPrice: 33000,
    productSize: "Ukuran 2liter",
    storeName: 'Indomaret',
    uri: require('../../assets/minyakCrop.png')
  },
  {
    id: 3,
    productName: 'Gulaku Premium',
    productPrice: 17000,
    productSize: 'Ukuran 1Kg',
    storeName: 'Carrefour',
    uri: require('../../assets/gulaCrop.png')
  },
  {
    id: 4,
    productName: 'Susu Childkid',
    productPrice: 34000,
    productSize: 'Ukuran 400g',
    storeName: 'Giant',
    uri: require('../../assets/chil-kid-vanilla.jpg')
  },
  {
    id: 1,
    productName: 'Beras Maknyuss',
    productPrice: 60000,
    productSize: 'Ukuran 5Kg',
    storeName: 'Alfamart',
    uri: require('../../assets/berasCrop.png')
  },
  {
    id: 2,
    productName: 'Minyak goreng Bimoli',
    productPrice: 33000,
    productSize: "Ukuran 2liter",
    storeName: 'Indomaret',
    uri: require('../../assets/minyakCrop.png')
  },
  {
    id: 3,
    productName: 'Gulaku Premium',
    productPrice: 17000,
    productSize: 'Ukuran 1Kg',
    storeName: 'Carrefour',
    uri: require('../../assets/gulaCrop.png')
  },
  {
    id: 4,
    productName: 'Susu Childkid',
    productPrice: 34000,
    productSize: 'Ukuran 400g',
    storeName: 'Giant',
    uri: require('../../assets/chil-kid-vanilla.jpg')
  }
]

export default class Basket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: [],
      modalVisible: false,
    }
  }

  _getData(data) {
    const ds = this.state.dataSource.cloneWithRows(data)
    this.setState({'data': ds})
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderProduct(product) {
    return (
      <View style={styleBasket.item}>
        <Image
          source={product.uri}
          style={styleBasket.imgStyle}
        />
        <View style={styleBasket.textContainer}>
          <Text style={styleBasket.headingStyle}>{product.productName}</Text>
          <Text>{product.productSize}</Text>
        </View>
        <TouchableOpacity style={styleBasket.clearIcon}
          onPress = {() => console.log('delete success')} >
          <Icon
            name="ios-close"
            size={30}
            color='red'
          />
        </TouchableOpacity>
      </View>
    )
  }

  componentDidMount() {
    this._getData(data)
  }

  render() {
    return (
      <ScrollView style={styleBasket.container}>
        <View style={styleBasket.headerContainer}>
          <Text style={styleBasket.headerText}>Your basket..</Text>
        </View>
        <View style={styleBasket.listContainer}>
          { this.state.data.length !== 0 &&
            <ListView contentContainerStyle={styleBasket.list}
            dataSource={this.state.data}
            renderRow={this._renderProduct.bind(this)}>
          </ListView>
          }
        </View>
        <View style={styleBasket.buttonContainer}>
          {/* <View style={styleBasket.button}>
            <Text style={styleBasket.headerText}>compare</Text>
          </View> */}
          <Icon.Button name="ios-pricetags-outline" style={styleBasket.button} onPress={() => console.log('compare success')}>
            <Text style={styleBasket.headerText}>compare</Text>
          </Icon.Button>
        </View>
      </ScrollView>
    )
  }
}
