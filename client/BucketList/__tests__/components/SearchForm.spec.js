import React from 'react'
const { shallow, configure } = require('enzyme')
const ReactSixteenAdapter = require('enzyme/build/adapters/ReactSixteenAdapter')
configure({adapter: new ReactSixteenAdapter()})
import SearchForm from '../../src/components/SearchForm'

describe('render SearchForm Screen', () => {
    it('should render correctly', () => {
        expect(shallow(<SearchForm />)).toHaveLength(1)
    })
    it('should have Text component', () => {
        expect(shallow(<SearchForm />).find('Text')).toHaveLength(1)
    })
    it('should have TouchableOpacity component', () => {
        expect(shallow(<SearchForm />).find('TouchableOpacity')).toHaveLength(1)
    })
    it('should have Text component', () => {
        expect(shallow(<SearchForm />).find('Text')).toHaveLength(1)
    })
})