<template>
  <v-card
      elevation="4"
      rounded
      class="pa-2 ma-2 white--text"
      color="primary"
  >
    <div class="d-flex justify-space-between align-content-center">
      <div class="d-flex flex-column">
        <v-card-title>{{device}}<v-btn class="mx-2"
                                         fab
                                         dark
                                         small
                                         color="blue-grey lighten-4"
        @click="goToDeviceView"><v-icon dark>
          mdi-cog
        </v-icon></v-btn></v-card-title>
        <v-card-subtitle>{{room}}</v-card-subtitle>
      </div>

    </div>
    <v-btn
        class="mx-2"
        fab
        dark
        large
        :color="clicked ? 'white' : 'blue-grey lighten-4'" @click="()=>clicked = !clicked"
        :elevation="clicked ? 0 : 8"
    ><v-icon :color="clicked ? 'blue-grey lighten-4' : 'white'">
      mdi-android
    </v-icon></v-btn>
  </v-card>
</template>

<script>
export default {
  name: "DeviceCard",
  data() {
    return {
      clicked: false
    }
  },
  props: ['room', 'device'],
  inject: ['setter'],
  methods: {
    goToDeviceView() {
      this.setter(this.room);
      this.$router.push({ name: 'device', params: { device: this.device, room:  this.room} })
    }
  }
}
</script>

<style scoped>

</style>