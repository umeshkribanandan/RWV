import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import User from '../views/User.vue'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'
import NProgress from 'nprogress'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start()
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          NProgress.done()
          routeTo.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({
              name: '404',
              params: {
                resource: 'event'
              }
            })
          } else {
            next({
              name: 'network-issue'
            })
          }
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
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    name: '404',
    redirect: {
      name: '404',
      params: {
        resource: 'page'
      }
    }
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
