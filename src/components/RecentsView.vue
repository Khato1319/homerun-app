<template>
  <div>
  <v-card-title>Dispositivos recientes</v-card-title>
<DevicesView ></DevicesView>
  </div>
</template>

<script>
import DevicesView from "@/components/DevicesView";
export default {
  name: "RecentsView",
  components: {
    DevicesView
  }
}
</script>

<style scoped>

</style>