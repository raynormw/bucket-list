import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { color } from './styles'
import BurgerButton from './buttons/BurgerButton'
import GroceryButton from './buttons/GroceryButton'
import DrawerContent from './screens/DrawerContent'
import Home from './screens/Home'
import Basket from './screens/Basket'
import Search from './screens/Search'
import Login from './screens/Login'
import Register from './screens/Register'
import LittleMaps from './screens/LittleMaps'
import Maps from './screens/Maps'
import DetailProduct from './screens/DetailProduct'

const MainNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: <BurgerButton nav = {navigation} />,
      headerRight: <GroceryButton nav = {navigation} />,
      title: 'Price Police',
      headerStyle: {
        backgroundColor: color.lightBlue,
      },
      headerTitleStyle: {
        color: color.white
      },
    })
  },
  Basket: {
    screen: Basket,
    navigationOptions: () => ({
      title: 'Price Police',
      headerStyle: {
        backgroundColor: color.orange,
      },
      headerTitleStyle: {
        color: color.white
      },
    })
  },
  Search: {
    screen: Search,
    navigationOptions: () => ({
      header: null
    })
  },
  Maps: {
    screen: Maps
  },
  DetailProduct: {
    screen: DetailProduct,
    navigationOptions: () => ({
      title: 'Comparing',
      headerStyle: {
        backgroundColor: color.lightning_yellow
      }
    })
  }
}, { headerMode: 'screen' })

const Routing = DrawerNavigator({
  Home: {
    screen: MainNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="home"
          size={20}
          style={{color: tintColor}} />
      )
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="sign-in"
          size={20}
          style={{color: tintColor}} />
      )
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      drawerLabel: 'Register',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="users"
          size={20}
          style={{color: tintColor}} />
      )
    }
  }
},
{
  contentOptions: {
    activeTintColor: color.lightOrange,
    activeBackgroundColor: color.black,
    inactiveTintColor: color.black,
    inactiveBackgroundColor: color.lightOrange,
  },
  contentComponent: props => <DrawerContent {...props} />,
}
)


export default Routing
