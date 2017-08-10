import { StyleSheet } from 'react-native'

export const color = {
  white: '#F8F8F8',
  black: '#38474F',
  gray: '#E8E8E8',
  darkGray: '#A6A6AD',
  lightBlue: '#52B3D9',
  darkBlue: '#3A539B',
  orange: '#F6846A',
  lightOrange: '#FFEEE4',
}

export const styles = StyleSheet.create({
  burgerButton: {
    color: color.black,
    paddingLeft: 10
  },
  groceryButton: {
    color: color.black,
    paddingRight: 10
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.orange,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  boxContainer: {
    flex: 1
  },
  header: {
    flex: 1
  },
  main: {
    flex: 3,
    justifyContent: 'space-between'
  },
  footer: {
    flex: 4
  }
})

export const styleMenu = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.gray,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    flex: 2,
    backgroundColor: color.darkBlue
  },
  search: {
    flex: 2,
    backgroundColor: color.orange
  },
  products: {
    flex: 4,
    backgroundColor: color.lightBlue
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
})
