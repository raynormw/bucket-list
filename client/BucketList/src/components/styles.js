import { StyleSheet } from 'react-native'

export const color = {
  white: '#F8F8F8',
  black: '#38474F',
  gray: '#E8E8E8',
  lightGray: '#DDD',
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
    backgroundColor: color.orange,
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
  },
  backContainer: {
    flex: 1,
    marginLeft: 20
  },
  searchBoxContainer: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
    flex: 3.5,
  },
  listContainer: {
    flex: 3.5
  }
})
