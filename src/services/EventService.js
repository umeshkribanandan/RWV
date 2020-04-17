import axios from 'axios'
//import NProgress from 'nprogress'

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  },
  timeout: 10000
})

// API.interceptors.request.use(config => {
//   NProgress.start()
//   return config
// })

// API.interceptors.response.use(response => {
//   NProgress.done()
//   return response
// })

export default {
  getEvents(perPage, page) {
    return API.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return API.get('/events/' + id)
  },
  postEvent(event) {
    return API.post('/events', event)
      .then(() => {})
      .catch(() => {
        console.log('service:error while creating event')
      })
  }
}
