import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  totalEventCount: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENT_TOTAL_COUNT(state, totalEventCount) {
    state.totalEventCount = totalEventCount
  }
}

export const actions = {
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
  },
  fetchEvents({
    commit
  }, {
    perPage,
    page
  }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENT_TOTAL_COUNT', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  fetchEvent({
    commit,
    getters
  }, eventId) {
    let event = getters.getEventById(eventId)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(eventId)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

export const getters = {
  getEventById: state => eventId => {
    return state.events.find(event => event.id == eventId)
  }
}
