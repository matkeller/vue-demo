import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Profile from '@/components/Profile'
import Announcements from '@/components/Announcements'
import Submit from '@/components/Submit'
import List from '@/components/List'
import Form from '@/components/Form'


Vue.use(Router)

export default new Router({
  ////mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      //Home does not require authentication
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: Announcements,
      meta: { requiresAuth: true }
    },
    {
      path: '/submit',
      name: 'submit',
      component: Submit,
      meta: { requiresAuth: true }
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: { requiresAuth: true }
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
      meta: { requiresAuth: true }
    }

  ]
})
