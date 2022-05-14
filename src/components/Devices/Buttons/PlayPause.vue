<template>
  <v-slide-x-transition>
    <v-btn class="mx-2"
           fab
           dark
           large
           @click="()=>{clicked = !clicked; $emit('onClick')}"
           color="primary"
           elevation="8"
    >
      <v-icon>
        {{ clicked ? 'mdi-play' : 'mdi-pause' }}
      </v-icon>
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
  export default {
    name: "PlayPause",
    props: ['onClick'],
    data() {
      return {
        clicked: false,
      }
    },
    methods: {
      getActionValue() {
        return {
          displayValue: this.clicked ? 'reanudar' : 'pausar',
          actionName: this.clicked ? this.apiId[0] : this.apiId[1]
        }
      }
    }
  }
</script>

<style scoped>

</style>