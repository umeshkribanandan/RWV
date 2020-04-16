export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 1
export const mutations = {
  ADD(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
    console.log('array', state.notifications)
  },
  DELETE(state, notification) {
    state.notifications = state.notifications.filter(n => {
      n.id === notification.id
    })
  }
}
export const actions = {
  addNotification({
    commit
  }, notification) {
    console.log(notification)
    commit('ADD', notification)
  },
  removedNotification({
    commit
  }, notification) {
    commit('DELETE', notification)
  }
}
