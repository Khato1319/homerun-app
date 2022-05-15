<template>
<v-slide-x-transition>
  <div>
    <div class="text-sm-left ml-3 mt-6 mb-6 primary--text">Estado: {{componentState ? 'Abierto' : 'Cerrado'}}</div>

    <v-btn class="mx-2"
           large
           color='primary'
           @click="clickHandler"
           elevation="8"
           :disabled="this.deviceView && this.state.status !== 'opened' && this.state.status !== 'closed'"
    >
      {{componentState ? 'CERRAR' : 'ABRIR'}}
    </v-btn>
  </div>
</v-slide-x-transition>
</template>

<script>
export default {
  name: "SwitchButton",
  props: ['apiId', 'name', 'state', 'deviceView', 'statusParam', 'msg', 'possibleStatus'],
  data() {
    return {
      value: false
    }
  },
mounted() {
    if (this.deviceView)
      this.value = this.componentState
},
  methods: {
    getActionValue() {
      return {
        displayValue: this.componentState ? 'Abrir' : 'Cerrar',
        actionName: this.componentState ? this.apiId[0] : this.apiId[1]
      }
    },
    clickHandler() {
      if (this.deviceView) {
        this.$store.dispatch('device/applyAction', {name: this.name, action: this.componentState ? this.apiId[1] : this.apiId[0]})
      }
      else {
        this.value = !this.value
      }
    }
  },
  computed: {
    componentState() {
      if (this.deviceView)
        return this.state[this.statusParam] === this.possibleStatus[0]
      return this.value
      // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
    }
  }
}
</script>

<style scoped>

</style>