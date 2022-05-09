<template>
  <div>
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >Dispositivos recientes</div>
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