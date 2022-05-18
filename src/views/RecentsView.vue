<template>
  <div class="fill-height overflow-hidden">
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >
      Dispositivos Recientes</div>
    <div :class="recentDevices.length === 0 ? 'fill-height d-flex flex-column justify-center align-content-center' : ''">
      <div v-if="recentDevices.length === 0">
        <div class="text--blue-grey lighten-4"> La pestaña <b>Dispositivos Recientes</b> está vacía.</div>
        <div class="text--blue-grey text-sm-body-2 help-height" >Cuando modifiques algún dispositivo, aparecerá aquí para que lo puedas acceder más rápidamente.</div>
      </div>
      <DevicesView :devices="recentDevices"/>
    </div>
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
.help-height{
  height: 340px;
}
</style>