import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  }
})

export default {
  getEvents() {
    return API.get('/events')
  },
  getEvent(id) {
    return API.get('/events/' + id)
  }
}
