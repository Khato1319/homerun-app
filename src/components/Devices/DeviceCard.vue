<template>
  <v-card
      elevation="4"
      rounded
      class="pa-2 ma-2 white--text"
      color="primary"
  >
    <div class="d-flex justify-space-between align-content-center">
      <div class="d-flex flex-column">
        <v-card-title>{{converter(device)}}<v-btn class="mx-2"
                                         fab
                                         dark
                                         small
                                         color="blue-grey lighten-4"
        @click="()=> {addToRecents(); goToDeviceView()}"><v-icon dark>
          mdi-cog
        </v-icon></v-btn></v-card-title>
        <v-card-subtitle>{{converter(room)}}</v-card-subtitle>
      </div>

    </div>
    <v-btn
        class="mx-2"
        fab
        dark
        large
        :color="clicked ? 'white' : 'blue-grey lighten-4'" @click="()=>{clicked = !clicked; addToRecents()}"
        elevation="8"

    ><v-icon :color="clicked ? 'blue-grey lighten-4' : 'white'">
      mdi-android
    </v-icon></v-btn>
  </v-card>
</template>

<script>
import {slugToText} from "../../../utils/Utils";
export default {
  name: "DeviceCard",
  data() {
    return {
      clicked: false,
      converter: slugToText
    }
  },
  props: ['room', 'device', 'type'],
  inject: ['supportedDevices', 'addToRecent'],
  methods: {
    goToDeviceView() {
      this.$store.commit('selectRoom', this.room);
      this.$router.push({ name: this.type, params: { deviceName: this.device, room: this.room } })
    },
    addToRecents() {
      this.addToRecent(this.device)
    }
  }
}
</script>

<style scoped>

</style>