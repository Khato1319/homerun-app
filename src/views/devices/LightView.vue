<template>
<GenericView :device-name="$route.params.deviceName" device-type="light"
device-id="" dispositivo="lámpara"></GenericView>
</template>

<script>
import GenericView from "@/views/devices/GenericView";

export default {
  name: "LightView",
  components: {
    GenericView
  }
}

</script>

<style scoped>

</style>