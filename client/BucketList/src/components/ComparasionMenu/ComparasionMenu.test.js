import React from 'react'
import { shallow } from 'enzyme'
import ComparasionMenu from './ComparasionMenu'

describe('rendering <ComparasionMenu />', () => {
    let wrapper = shallow(<ComparasionMenu />)
    it('should render corectly', () => {
        expect(wrapper).toHaveLength(1)
    })
    it('should have <Card /> component', () => {
        expect(wrapper.find('Card').toBe(true))
    })
    describe('rendering <Card /> component', () => {
            let wrapCard = shallow(<CardItem />)
            it('should have <Button /> component', () => {
               expect(wrapCard.find('Button').toHaveLength(1))
            })
            it('should have <Image /> component', () => {
                expect(wrapCard.find('Image').toHaveLength(1))
            })
        })
})