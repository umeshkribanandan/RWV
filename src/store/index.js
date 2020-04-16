import Vue from 'vue'
import Vuex from 'vuex'
import * as event from '@/store/modules/Event.js'
import * as user from '@/store/modules/User.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    event,
    user
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
})
