<template>
  <GenericView :device-name="$route.params.deviceName" device-type="blinds"
               device-id="" dispositivo="Cortina">
    <div class="text-sm-left ml-3 mt-6 primary--text">Estado: {{statusOutput}}</div>
    <v-progress-linear class="ma-3" style="max-width: 95%" :buffer-value="level" :value="currentLevel" color="primary"></v-progress-linear>
  </GenericView>
</template>

<script>
import GenericView from "@/views/devices/GenericView";
export default {
  name: "BlindsView",
  components: {
    GenericView
  },
  methods: {
    close() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      deviceName: this.$route.params.deviceName,
    }
  },
  mounted() {
    this.$store.dispatch('device/getAll')
  },
  computed: {
    state() {
      return this.$store.getters['device/getDevice'](this.deviceName).state
    },
    currentLevel() {
      return this.state.currentLevel
    },
    level() {
      return this.state.level
    },
    statusOutput() {
      if (this.state.status === "opened") {
        return 'Abierto'
      }
      else if (this.state.status === "opening") {
        return `Abriendo - ${Math.round(((100-this.currentLevel)-(100-this.level))*(100/this.level))}%`
      }
      else if (this.state.status === "closing") {
        return `Cerrando - ${this.currentLevel}%`
      }
      return `Cerrado al ${this.currentLevel}%`
    }
  },
  // watch: {
  //   async statusOutput() {
  //     while (this.$route.name === "blinds" && this.$route.params.deviceName === this.deviceName && this.state.status === "opening" || this.state.status === "closing") {
  //       await this.$store.dispatch('device/getAll')
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>