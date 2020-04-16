import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc231',
      name: 'Umesh'
    },
    events: [],
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
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({
      commit
    }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch(() => {
          console.log('actions:error while creating event')
        })
    }
  },
  modules: {}
})
