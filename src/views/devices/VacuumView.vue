<template>
  <GenericView :device-name="$route.params.deviceName" device-type="vacuum"
               dispositivo="Aspiradora">

      <div class="text-sm-left ml-3 mt-6 primary--text">Batería <span v-if="state.status === 'docked'">{{`(Cargando ${state.batteryLevel}%)`}}</span></div>

    <v-progress-linear class="ma-3" style="max-width: 95%" :value="state.batteryLevel" :color="state.batteryLevel <= 5 ? 'red' : 'primary'"></v-progress-linear>
    <div v-if="state.status !== 'docked' && state.batteryLevel <= 5" class="text-sm-caption ml-3 mt-6 red--text">Es necesario cargar el dispositivo</div>
  </GenericView>
</template>

<script>
import GenericView from "@/views/devices/GenericView";
export default {
  name: "VacuumView",
  components: {
    GenericView
  },
  methods: {
    close() {
      this.$router.go(-1);
    }
  },
  computed: {
    state() {
      return this.$store.getters['device/getDevice'](this.deviceName).state
    }
  },
  data() {
    return {
      deviceName: this.$route.params.deviceName,
    }
  }
}
</script>

<style scoped>

</style>