<template>
  <GenericView :device-name="$route.params.deviceName" device-type="alarm"
               device-id="" dispositivo="alarma"></GenericView>
</template>

<script>
import GenericView from "@/views/devices/GenericView";
import {slugToText} from "../../../utils/Utils";
export default {
  name: "LightView",
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
      converter: slugToText
    }
  }
}
</script>

<style scoped>

</style>