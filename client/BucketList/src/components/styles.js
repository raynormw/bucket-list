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
    margin: 5
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
    height: 200
  },
  cardList: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5
  },
  cardListItem: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5
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
    justifyContent: 'center'
  },
  cardListItemDetailProductName: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: '500'
  },
  cardListItemDetailPriceQty: {
    flex: 1,
    justifyContent: 'space-between'
  },
  cardListItemDetailPriceContent: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  cardListItemDetailQtyContent: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})
