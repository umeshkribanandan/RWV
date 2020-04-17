<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event">
    </EventCard>
    <template v-if="hasPreviousPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page
      </router-link>
      |
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index'
import NProgress from 'nprogress'

function getPageEvents(routeTo, next) {
  NProgress.start()
  const currentPage = parseInt(routeTo.query.page) || 1
  console.log(currentPage)
  store.dispatch('event/fetchEvents', { page: currentPage }).then(events => {
    NProgress.done()
    routeTo.params.page = currentPage
    next()
  })
}
export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    hasPreviousPage() {
      return this.page != 1
    },
    hasNextPage() {
      return this.page * this.event.perPage < this.event.totalEventCount
    },
    ...mapState(['event', 'event.totalEventCount'])
  }
}
</script>

<style lang="scss" scoped></style>
