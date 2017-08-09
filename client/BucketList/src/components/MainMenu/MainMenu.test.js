import React from 'react'
import { shallow } from 'enzyme'
import MainMenu from './MainMenu'

describe('rendering <MainMenu />', () => {
    let wrapper = shallow(<MainMenu />)
    it('should render <TouchableOpacity />', () => {
        expect(wrapper.find('TouchableOpacity')).toBe(true)
    })
    it('should render <Button />', () => {
        expect(wrapper.find('Button')).toBe(true)
    })
    it('Button should have text', () => {
        expect(shallow(<TouchableOpacity />).find('Button').prop('title').toEqual('Cari Product...'))
    })
    it('should render card <Card />', () => {
        expect(wrapper.find('Card')).toBe(true)
    })
    describe('rendering <Card /> component', () => {
        let wrapCard = shallow(<CardItem />)
        it('should have <Image /> component', () => {
            expect(wrapCard.find('Image').toHaveLength(1))
        })
    })
})