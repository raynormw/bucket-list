import React from 'react'
const { shallow, configure } = require('enzyme')
const ReactSixteenAdapter = require('enzyme/build/adapters/ReactSixteenAdapter')
configure({adapter: new ReactSixteenAdapter()})
import SearchScreen from '../../src/components/SearchScreen'

describe('render SearchScreen Screen', () => {
    it('should render correctly', () => {
        expect(shallow(<SearchScreen />)).toHaveLength(1)
    })
})