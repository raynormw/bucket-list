import React from 'react'
import { shallow } from 'enzyme'
import RouteMenu from './RouteMenu'

describe('rendering <RouteMenu />', () => {
    let wrapper = shallow(<RouteMenu />)
    it('should be render correctly' () => {
        expect(wrapper).toHaveLength(1)
    })
    it('should have back <Button />', () => {
        expect(wrapper.find('Button').toBe(true))
    })
    it('should have <Card /> component', () => {
        expect(wrapper.find('Card').toBe(true))
    })
    it('should have <Image />', () => {
        expect(wrapper.find('Image').toBe(true))
    })
})