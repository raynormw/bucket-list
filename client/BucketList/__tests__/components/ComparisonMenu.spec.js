import React from 'react'
const { shallow, configure } = require('enzyme')
const ReactSixteenAdapter = require('enzyme/build/adapters/ReactSixteenAdapter')
configure({adapter: new ReactSixteenAdapter()})
import ComparisonMenu from '../../src/components/ComparisonMenu'

describe('render ComparisonMenu Screen', () => {
    it('should render correctly', () => {
        expect(shallow(<ComparisonMenu />)).toHaveLength(1)
    })
    it('should have TouchableOpacity component', () => {
        expect(shallow(<ComparisonMenu />).find('TouchableOpacity')).toHaveLength(2)
    })
    it('should have Text component', () => {
        expect(shallow(<ComparisonMenu />).find('Text')).toHaveLength(3)
    })
    it('should have Image component', () => {
        expect(shallow(<ComparisonMenu />).find('Image')).toHaveLength(1)
    })
})