<template>
  <h1>This is {{ username }}'s Page</h1>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>
