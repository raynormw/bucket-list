import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const newWidth = (windowWidth / 2) - 10
const newHeight = (windowHeight / 100) * 40
const basketWidth = windowWidth - 10
const basketHeight = (windowHeight / 100) * 20

export const color = {
  white: '#F8F8F8',
  black: '#38474F',
  gray: '#E8E8E8',
  lightGray: '#DDD',
  darkGray: '#A6A6AD',
  lightBlue: '#52B3D9',
  darkBlue: '#22313F',
  orange: '#F6846A',
  lightOrange: '#FFEEE4',
  niceOrange: '#F2784B',
  green: '#2ECC71',
  red: '#E74C3C',
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
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  logo: {
    flex: 1,
  },
  header: {
    flex: 2.5,
    flexDirection: 'row',
    margin: 10,
  },
  main: {
    flex: 3.5,
    justifyContent: 'space-between',
    marginTop: 10
  },
  footer: {
    flex: 4
  },
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  notFound: {
    fontSize: 25,
    fontWeight: 'bold',
  }
})

export const styleMenu = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  banner: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.darkGray,
    paddingBottom: 3
  },
  imgBanner: {
    flex: 4,
    backgroundColor: color.white,
    alignItems: 'center',
  },
  imgStyle: {
    flex: 1,
    resizeMode: 'contain',
  },
  textButtonContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: color.white
  },
  textBanner: {
    flex: 4,
    justifyContent: 'center'
  },
  textHeading: {
    color: color.black,
    fontSize: 20
  },
  textSubheading: {
    color: color.darkGray,
    fontSize: 15
  },
  buttonBannerContainer: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonBanner: {
    flex: 1,
    backgroundColor: color.niceOrange,
    justifyContent: 'center',
    borderRadius: 4,
    padding: 8
  },
  buttonText: {
    color: color.white,
    fontSize: 10
  },
  searchContainer: {
    flex: 0.75,
    justifyContent: 'center',
    backgroundColor: color.gray,
    padding: 15
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.lightGray,
    borderBottomWidth: 0,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    flex: 1,
    paddingLeft: 25,
  },
  searchText: {
    flex: 7,
    alignItems: 'flex-start'
  },
  popularTextContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  popularText: {
    color: color.black,
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8
  },
  products: {
    flex: 3.5,
    flexDirection: 'row',
    backgroundColor: color.gray,
    justifyContent: 'space-between'
  },
  boxProduct: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.lightGray,
    backgroundColor: color.white,
    margin: 5,
  }
})

export const styleSearch = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.darkBlue,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  backContainer: {
    flex: 1,
    marginLeft: 20
  },
  searchBoxContainer: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 20,
    backgroundColor: color.white,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: color.lightGray,
  },
  searchIcon: {
    flex: 0.5,
    paddingLeft: 20,
  },
  searchText: {
    flex: 3,
  },
  clearIcon: {
    flex: 0.5
  },
  listContainer: {
    flex: 3.5
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.lightGray,
    backgroundColor: color.white,
    margin: 5,
    width: newWidth,
    height: newHeight
  },
  imgStyle: {
    width: newWidth - 35,
    height: newHeight - 110,
  },
  headingStyle: {
    marginBottom: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize: (40 / windowWidth) * 100
  },
  infoStyle: {
    marginBottom: 5,
    // fontSize: (35 / windowWidth) * 100
  },
  containerModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  modalStyle: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.white,
    backgroundColor: color.white,
    padding: 20,
    width: newWidth + 100,
    height: newHeight - 100,
  },
  textModal: {
    color: color.black,
    fontWeight: 'bold',
    //marginTop: 10,
    marginBottom: 20,
    fontSize: 20
  },
  containerButton: {
    padding: 10,
    flexDirection: 'row',
  },
  buttonYes: {
    alignItems: 'center',
    backgroundColor: color.green,
    borderRadius: 4,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonNo: {
    alignItems: 'center',
    backgroundColor: color.red,
    borderRadius: 4,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    marginLeft: 20,
    marginRight: 20
  },
  textButton: {
    color: color.white,
    fontSize: 16
  }
})

export const styleBasket = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: (windowHeight / 100) * 10,
    backgroundColor: color.black,
  },
  headerText: {
    color: color.lightOrange,
    fontSize: 20,
  },
  listContainer: {
    flex: 3,
  },
  list: {
    flex: 1,
    margin: 10,
  },
  buttonContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  button: {
    backgroundColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
    height: (windowHeight / 100) * 10,
    width: (basketWidth / 2) - 50,
    borderRadius: 4
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.lightGray,
    backgroundColor: color.white,
    marginBottom: 10,
    padding: 15,
    width: basketWidth,
    height: basketHeight
  },
  imgStyle: {
    flex: 1.5,
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headingStyle: {
    fontWeight: 'bold',
    marginBottom: 15
  },
  clearIcon: {
    flex: 0.5,
    marginLeft: 40,
  }
})
