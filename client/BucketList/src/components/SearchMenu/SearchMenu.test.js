import React from 'react'
import { shallow } from 'enzyme'
import SearchMenu from './SearchMenu'

describe('rendering <SearchMenu />', () => {
    let wrapper = shallow(<SerachMenu />)
    it('should render corectly', () => {
        expect(wrapper).toHaveLength(1)
    })
    it('should render <TextInput />', () => {
        expect(wrapper.find('TextInput').toHaveLength(1))
    })
    describe('rendering <TextInput /> Property', () => {
            let wrapText = shallow(<TextInput />)
            it('should have Placeholder property', () => {
                expect(wrapText).prop('placeholder').toEqual('Cari Produk...')
            })
        })
    it('should have <Button />', () => {
        expect(wrapper.find('Button').toBe(true))
    })
    describe('should have Text', () => {
            let wrapButton = shallow(<Button />)
            it('should have value on text', () => {
                expect(wrapButton.prop('title').toEqual('compare'))
            })
        })
})