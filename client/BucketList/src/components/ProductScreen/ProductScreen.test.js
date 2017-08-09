import React from 'react'
import { shallow } from 'enzyme'
import ProductScreen from './ProductScreen'

describe('rendering <ProductScreen />', () => {
    let wrapper = shallow(<ProductScreen />)
    it('should render corectly', () => {
        expect(wrapper).toHaveLength(1)
    })
    it('should have <Card /> component', () => {
        expect(wrapper.find('Card').toBe(true))
    })
    describe('rendering <Card /> component', () => {
            let wrapCard = shallow(<CardItem />)
            it('should have <Image /> component', () => {
                expect(wrapCard.find('Image').toBe(true))
            })
            it('should have <Text /> component', () => {
                expect(wrapCard.find('Text').toBe(true))
            })
            it('should have <Button /> component', () => {
                expect(wrapCard.find('Button').toBe(true))
            })
            it('Button should have title', () => {
                expect(wrapCard.find('Button').prop('title').toEqual('Ok'))
            })
        })
})