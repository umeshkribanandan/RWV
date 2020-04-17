import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  totalEventCount: 0,
  perPage: 3
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
    commit,
    dispatch
  }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        let n = {
          type: 'success',
          message: 'The event has been created'
        }
        dispatch('notification/addNotification', n, {
          root: true
        })
      })
      .catch(error => {
        let n = {
          type: 'error',
          message: 'There was a problem creating an event: ' + error.message
        }
        dispatch('notification/addNotification', n, {
          root: true
        })
        throw error
      })
  },
  fetchEvents({
    commit,
    dispatch,
    state
  }, {
    page
  }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENT_TOTAL_COUNT', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const n = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        console.log(n)
        dispatch('notification/addNotification', n, {
          root: true
        })
      })
  },
  fetchEvent({
    commit,
    dispatch,
    getters
  }, eventId) {
    let event = getters.getEventById(eventId)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(eventId)
        .then(response => {
          commit('SET_EVENT', response.data)
          return response.data
        })
        .catch(error => {
          const n = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/addNotification', n, {
            root: true
          })
        })
    }
  }
}

export const getters = {
  getEventById: state => eventId => {
    return state.events.find(event => event.id == eventId)
  }
}
