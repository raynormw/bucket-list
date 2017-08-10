import React from 'react'
const { shallow, configure } = require('enzyme')
const ReactSixteenAdapter = require('enzyme/build/adapters/ReactSixteenAdapter')
configure({adapter: new ReactSixteenAdapter()})
import Card from '../../src/components/Card'

describe('render Card Screen', () => {
    it('should render correctly', () => {
        expect(shallow(<Card />)).toHaveLength(1)
    })
    it('should have Image component', () => {
        expect(shallow(<Card />).find('Image')).toHaveLength(1)
    })
    it('should have Text component', () => {
        expect(shallow(<Card />).find('Text')).toHaveLength(2)
    })
    it('should have TouchableHighlight component', () => {
        expect(shallow(<Card />).find('TouchableHighlight')).toHaveLength(1)
    })
})