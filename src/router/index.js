import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Wallet from '@/views/Wallet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      redirect: { name: 'Wallet' }
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet // ,
      // redirect: { name: 'WalletList' }
    }
  ]
})
