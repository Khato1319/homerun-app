<template>
<v-slide-x-transition>
<v-btn class="mx-2"
       large
       color='primary'
       @click="clickHandler"
       elevation="8"
       v-if="deviceView"
       :disabled="state.status !== possibleStatus[0] && state.status !== possibleStatus[1]"
>
  {{componentState ? msg[1] : msg[0]}}
</v-btn>
</v-slide-x-transition>
</template>

<script>
export default {
  name: "OpenClose",
  props: ['apiId', 'name', 'state', 'deviceView', 'statusParam', 'msg', 'possibleStatus'],
  data() {
    return {
    }
  },

  methods: {
    getActionValue() {
      return {
        displayValue: '',
        actionName: this.componentState ? this.apiId[0] : this.apiId[1]
      }
    },
    clickHandler() {
      if (this.deviceView) {
        this.$store.dispatch('device/applyAction', {name: this.name, action: this.componentState ? this.apiId[1] : this.apiId[0]})
      }
    }
  },
  computed: {
    componentState() {
      return this.state[this.statusParam] === this.possibleStatus[0]
      // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
    }
  }
}
</script>

<style scoped>

</style>