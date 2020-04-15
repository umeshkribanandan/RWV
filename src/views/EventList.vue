<template>
  <div>
    <h1>Event Listing</h1>
    <div>
      <EventCard></EventCard>
      <EventCard></EventCard>
      <EventCard></EventCard>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard
  }
}
</script>

<style lang="scss" scoped></style>
