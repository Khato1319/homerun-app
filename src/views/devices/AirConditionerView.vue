<template>
  <GenericView :device-name="$route.params.deviceName"
               device-type="ac" dispositivo="Aire acondicionado"/>
</template>

<script>
import GenericView from "@/views/devices/GenericView";
export default {
  name: "AirConditionerView",
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