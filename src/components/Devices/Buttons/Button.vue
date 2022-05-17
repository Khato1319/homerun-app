<template>
  <v-slide-x-transition>
    <v-btn class="mx-2"
         large
         color='primary'
         @click="clickHandler"
         elevation="8"
         v-if="deviceView"
         :disabled="state.status === 'docked'">
    {{label}}
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
export default {
  name: "ButtonComp",
  props: ['apiId', 'name', 'state', 'deviceView','label'],
  data() {
    return {
    }
  },

  methods: {
    getActionValue() {
      return {
        displayValue: '',
        actionName: this.apiId
      }
    },
    clickHandler() {
      if (this.deviceView) {
        this.$store.dispatch('device/applyAction', {name: this.name, action: this.apiId})
      }
    }
  },
  computed: {
      // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
  }
}
</script>

<style scoped>

</style>