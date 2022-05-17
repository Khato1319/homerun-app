<template>
  <v-slide-x-transition>
    <div>
      <div class="text-sm-left ml-3 mt-6 mb-3 primary--text">Estado: {{componentState ? 'Encendido' : 'Apagado'}}</div>

      <v-btn class="mx-2"
             fab
             large
             :color="componentState ?  'primary' : 'blue-grey lighten-5'"
             @click="clickHandler"
             elevation="8"
             :disabled="checkDisabled()"
      >
        <v-icon :color="componentState ? 'white' : 'black'"
        >mdi-power</v-icon>
      </v-btn>
    </div>
  </v-slide-x-transition>
</template>

<script>
  export default {
    name: "OnOff",
    props: ['apiId', 'name', 'state', 'deviceView', 'statusParam', 'disable'],
    data() {
      return {
        clicked: null
      }
    },
    mounted() {
      if (this.deviceView) {
        this.clicked = this.componentState
      }
    },
    methods: {
      checkDisabled() {
        if (this.disable && this.deviceView) {
          return this.state.batteryLevel < 5
        }
        return false
      },
      getActionValue() {
        return {
          displayValue: this.componentState ? 'Encender' : 'Apagar',
          actionName: this.componentState ? this.apiId[0] : this.apiId[1]
        }
      },
      clickHandler() {
        this.clicked = !this.clicked
        if (this.deviceView) {
          this.$store.dispatch('device/applyAction', {name: this.name, action: this.componentState ? this.apiId[1] : this.apiId[0]})
        }
      }
    },
    computed: {
      componentState() {
        if (this.deviceView) {
          return this.state[this.statusParam] === "on" || this.state[this.statusParam] === "active"
        }
        return this.clicked
        // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
      }
    }
  }
</script>

<style scoped>

</style>