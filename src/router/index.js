import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import User from '../views/User.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'
import NProgress from 'nprogress'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start()
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        NProgress.done()
        routeTo.params.event = event
        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '*',
    component: NotFoundComponent
  }
  // {
  //   path: '/event/create',
  //   name: 'event-create',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
