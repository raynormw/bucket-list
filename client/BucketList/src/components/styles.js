import { StyleSheet } from 'react-native'

export const color = {
  white: '#F8F8F8',
  black: '#38474F',
  gray: '#E8E8E8',
  darkGray: '#A6A6AD',
  lightBlue: '#3498db',
  darkBlue: '#29353A',
  orange: '#F6846A',
  lightOrange: '#FFFEEE4'
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightOrange,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: color.black,
    marginBottom: 5,
  },
  burgerButton: {
    color: color.black,
    paddingLeft: 10
  },
  GroceryButton: {
    color: color.black,
    paddingRight: 10
  }
})
