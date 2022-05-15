<template>
  <div>
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >Dispositivos Recientes</div>
    <DevicesView :devices="recentDevices"/>
  </div>
</template>

<script>
import DevicesView from "@/components/Devices/DevicesView";
export default {
  name: "RecentsView",
  components: {
    DevicesView
  },
  inject: ['recent'],
  computed: {
    recentDevices() {
      let devices=this.$store.getters['device/getDevices']
      if (devices.length === 0)
        return []
      return devices.filter(d => this.recent.includes(d.name));
    }
  },

}
</script>

<style scoped>

</style>