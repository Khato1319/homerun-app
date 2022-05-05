<template>
  <div>
  <v-card-title>Dispositivos recientes</v-card-title>
<DevicesView :devices="recentDevices"></DevicesView>
  </div>
</template>

<script>
import DevicesView from "@/components/DevicesView";
export default {
  name: "RecentsView",
  components: {
    DevicesView
  },
  inject: ['devices', 'recent'],
  computed: {
    recentDevices() {
      return this.devices.filter(d => this.recent.includes(d.name));
    }
  }
}
</script>

<style scoped>

</style>