import React from 'react'
const { shallow, configure } = require('enzyme')
const ReactSixteenAdapter = require('enzyme/build/adapters/ReactSixteenAdapter')
configure({adapter: new ReactSixteenAdapter()})
import ButtonCompare from '../../src/components/ButtonCompare'

describe('render ButtonCompare Screen', () => {
    it('should render correctly', () => {
        expect(shallow(<ButtonCompare />)).toHaveLength(1)
    })
    it('should have TouchableOpacity component', () => {
        expect(shallow(<ButtonCompare />).find('TouchableOpacity')).toHaveLength(1)
    })
    it('should have Text component', () => {
        expect(shallow(<ButtonCompare />).find('Text')).toHaveLength(1)
    })
})