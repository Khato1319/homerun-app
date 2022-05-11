<template>
  <v-slide-x-transition>
    <v-btn class="mx-2"
           fab
           dark
           large
           :color="clicked ? 'white' : 'blue-grey lighten-4'"
           @click="()=>{clicked = !clicked; $emit('onClick')}"
           elevation="8"
    >
      <v-icon :color="clicked ? 'blue-grey lighten-4' : 'white'"
      >mdi-power</v-icon>
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
  export default {
    name: "OnOff",
    props: ['onClick'],
    data() {
      return {
        clicked: false,
      }
    },

    methods: {
      getActionValue() {
        return [this.clicked, this.clicked ? 'encendido' : 'apagado']
      }
    }
  }
</script>

<style scoped>

</style>