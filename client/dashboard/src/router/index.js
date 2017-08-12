import Vue from 'vue'
import Router from 'vue-router'
import Stores from '@/components/Stores'
import Goods from '@/components/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Stores',
      component: Stores
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
