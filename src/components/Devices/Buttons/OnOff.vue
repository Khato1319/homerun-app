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
  }
</script>

<style scoped>

</style>