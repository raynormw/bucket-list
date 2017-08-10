import React from 'react'
const { shallow, configure } = require('enzyme')
const ReactSixteenAdapter = require('enzyme/build/adapters/ReactSixteenAdapter')
configure({adapter: new ReactSixteenAdapter()})
import ButtonAddStuff from '../../src/components/ButtonAddStuff'

describe('render ButtonAddStuff Screen', () => {
    it('should render correctly', () => {
        expect(shallow(<ButtonAddStuff />)).toHaveLength(1)
    })
    it('should have TouchableOpacity component', () => {
        expect(shallow(<ButtonAddStuff />).find('TouchableOpacity')).toHaveLength(1)
    })
    it('should have Text component', () => {
        expect(shallow(<ButtonAddStuff />).find('Text')).toHaveLength(1)
    })
})