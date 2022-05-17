<template>
  <GenericView :device-name="$route.params.deviceName"
               device-type="oven" dispositivo="Horno"/>
</template>

<script>
import GenericView from "@/views/devices/GenericView";
export default {
  name: "OvenView",
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
  }
}
</script>

<style scoped>

</style>