import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Auth from '@/views/Auth'
import AuthLogin from '@/views/Auth/AuthLogin'
import AuthRegister from '@/views/Auth/AuthRegister'
import Wallet from '@/views/Wallet'
import Member from '@/views/Member'
import MemberMain from '@/views/Member/MemberMain'

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
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      redirect: { name: 'AuthLogin' },
      children: [
        {
          path: 'login',
          name: 'AuthLogin',
          component: AuthLogin,
          props: true
        },
        {
          path: 'register',
          name: 'AuthRegister',
          component: AuthRegister
        }
      ]
    },
    {
      path: '/member',
      name: 'Member',
      component: Member,
      props: true,
      redirect: { name: 'MemberMain' },
      children: [
        {
          path: 'main',
          name: 'MemberMain',
          component: MemberMain
        }
      ]
    }
  ]
})
