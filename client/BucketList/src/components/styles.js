import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export const aspectRatio =  windowWidth / windowHeight
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
  pumice_gray: '#D2D7D3',
  iron_gray: '#DADFE1',
  lightning_yellow: '#F5AB35'
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
    flexDirection: 'column'
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

export const styleZ = StyleSheet.create({
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
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    overflow: 'hidden',
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  containerLogin: {
    flex: 1,
    backgroundColor: '#3498DB'
  },
  logoLoginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#fff',
    marginTop: 10,
    width: 160,
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.7
  },
  formLogin: {
    padding: 20
  },
  input: {
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    fontWeight: '200',
    fontSize: 16,
    borderRadius: 50,
    opacity: 0.7
  },
  buttonContainer: {
    backgroundColor: '#4183D7',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 50,
    opacity: 0.7
  },
  buttonText: {
    textAlign: 'center',
    color: "#FFF",
    fontWeight: '700'
  },
  registerContainer: {
    flex: 1,
    backgroundColor: '#9b59b6'
  },
  headerText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontWeight: '200',
    paddingTop: 20
  },
  registerInput: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#FFF',
    fontWeight: '200',
    fontSize: 15,
    opacity: 0.7,
    borderRadius: 50,
    marginBottom: 10
  },
  registerFrom: {
    padding: 40
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    margin: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.lightGray,
    borderBottomWidth: 0,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  cardHeader: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 5,
    flexDirection: 'row',
  },
  cardTextHeader: {
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.9,
    margin: 5,
    color: color.black,
    marginTop: 5,
    justifyContent: 'center'
  },
  cardMap: {
    flex: 3,
    justifyContent: 'center',
    width: '100%',
    height: 200,
    shadowOpacity: 1
  },
  cardList: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: color.lightGray,
    borderBottomWidth: 0,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1
  },
  cardListItem: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  cardListItemImage: {
    flex: 1,
    justifyContent: 'flex-start',
    resizeMode: 'contain',
    backgroundColor: '#EEEEEE'
  },
  cardListItemDetail: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20
  },
  cardListItemDetailProductName: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: '500'
  },
  cardListItemDetailProductNameSelected: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: '500',
    color: 'green'
  },
  cardListItemDetailPriceQty: {
    flex: 3,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  cardListItemDetailPriceContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    fontWeight: '400'
  },
  cardListItemDetailQtyContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingLeft: 20,
    fontWeight: '400'
  },
  buttonGetRoute: {
    padding: 20,
    borderRadius: 4,
    backgroundColor: color.black
  }
})
