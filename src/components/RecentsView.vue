<template>
  <div>
  <v-card-title class="text-uppercase justify-space-between text-caption">Dispositivos recientes</v-card-title>
  <DevicesView :devices="recentDevices"></DevicesView>
  </div>
</template>

<script>
import DevicesView from "@/components/Devices/DevicesView";
import {mapState} from "vuex";
export default {
  name: "RecentsView",
  components: {
    DevicesView
  },
  inject: ['recent'],
  computed: {
    ...mapState(['devices']),
    recentDevices() {
      return this.devices.filter(d => this.recent.includes(d.name));
    }
  },

}
</script>

<style scoped>

</style>