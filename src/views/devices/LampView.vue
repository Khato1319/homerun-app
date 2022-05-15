<template>
<GenericView :device-name="$route.params.deviceName" device-type="lamp"
             dispositivo="Lámpara"></GenericView>
</template>

<script>
import GenericView from "@/views/devices/GenericView";

export default {
  name: "LampView",
  components: {
    GenericView
  }
}

</script>

<style scoped>

</style>