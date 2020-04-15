<template>
  <div>
    <h1>Event Listing</h1>
    <router-link :to="{ name: 'event-show', params: { id: 1 } }">
      Event 1
    </router-link>
    |
    <router-link :to="{ name: 'event-show', params: { id: 2 } }">
      Event 2
    </router-link>
    |
    <router-link :to="{ name: 'event-show', params: { id: 3 } }">
      Event 3
    </router-link>
  </div>
</template>
