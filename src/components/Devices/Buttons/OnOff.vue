<template>
  <v-slide-x-transition>
    <v-btn class="mx-2"
           fab
           dark
           large
           :color="componentState ? 'blue-grey lighten-4' : 'primary'"
           @click="clickHandler"
           elevation="8"
    >
      <v-icon :color="componentState ? 'primary' : 'white'"
      >mdi-power</v-icon>
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
  export default {
    name: "OnOff",
    props: ['onClick', 'apiId', 'name', 'state', 'deviceView', 'statusParam'],
    data() {
      return {
      }
    },

    methods: {
      getActionValue() {
        return {
          displayValue: this.componentState ? 'encender' : 'apagar',
          actionName: this.componentState ? this.apiId[0] : this.apiId[1]
        }
      },
      clickHandler() {
        if (this.deviceView) {
          this.$store.dispatch('device/applyAction', {name: this.name, action: this.componentState ? "turnOff" : "turnOn"})
        }
      }
    },
    computed: {
      componentState() {
        return this.state[this.statusParam] === "on"
        // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
      }
    }
  }
</script>

<style scoped>

</style>