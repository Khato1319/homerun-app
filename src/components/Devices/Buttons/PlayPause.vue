<template>
  <v-slide-x-transition>
    <v-btn class="mx-2"
           fab
           dark
           large
           @click="clickHandler"
           color="primary"
           elevation="8"
    >
      <v-icon>
        {{ componentState ? 'mdi-play' : 'mdi-pause' }}
      </v-icon>
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
  export default {
    name: "PlayPause",
    props: ['apiId', 'name', 'state', 'deviceView', 'statusParam'],
    data() {
      return {
      }
    },
    methods: {
      getActionValue() {
        return {
          displayValue: this.componentState ? 'reanudar' : 'pausar',
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
        return this.state[this.statusParam] === "play"
        // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
      }
    }
  }
</script>

<style scoped>

</style>