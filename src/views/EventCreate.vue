<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        type="text"
        placeholder="Add an event title"
        v-model="event.title"
        class="field"
      />
      <BaseInput
        label="Description"
        type="text"
        placeholder="Add a description"
        v-model="event.description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        type="text"
        placeholder="Add a location"
        v-model="event.location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect label="Select a time" :options="times" v-model="event.time" />

      <BaseButton type="submit" buttonClass="button -fill-gradient"
        >Submit</BaseButton
      >
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEvent(),
      categories: this.$store.state.categories
    }
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: {
              id: this.event.id
            }
          })
          this.event = this.createFreshEvent()
        })
        .catch(error => {
          NProgress.done()
          console.log('dispatch:problem creating event')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
