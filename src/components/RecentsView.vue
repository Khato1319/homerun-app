<template>
  <div>
  <v-tab>Dispositivos recientes</v-tab>
<DevicesView :devices="recentDevices"></DevicesView>
  </div>
</template>

<script>
import DevicesView from "@/components/DevicesView";
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