<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @change="updateValue" v-bind="$attrs">
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/FormFieldMixin.js'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    listeners() {
      return {
        //  ...this.$listeners,
        change: this.updateValue
      }
    }
  }
}
</script>
