import React, { Component } from 'react'
import {
  Image,
  Dimensions
} from 'react-native'

const ImageScales = ({source, oriWidth, oriHeight}) => {

  let windowWidth = Dimensions.get('window').width
  let widthChange = windowWidth / oriWidth
  let newWidth = oriWidth * widthChange
  let newHeight = oriHeight * widthChange
  console.log(oriWidth, 'oriWidth');
  console.log(windowWidth, 'windowWidth');
console.log(newWidth, 'newWidth');
  return (
    <Image source={source} style={{width: newWidth, height: newHeight}}/>
  )
}

export default ImageScales
