<template>
  <v-container >
    <v-row class="d-flex justify-center ">
      <DeviceCard class="pa-2" v-for="device in devices" :key="device.name" :device="device.name" :room="device.room" :type="device.type"></DeviceCard>
    </v-row>
  </v-container>
</template>

<script>
import DeviceCard from "@/components/Devices/DeviceCard";
export default {
  name: "DevicesView",
  props: ['devices'],
  components: {
    DeviceCard
  }
}
</script>

<style scoped>

</style>