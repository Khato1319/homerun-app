<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <DeviceCard  class="pa-2" v-for="device in devices" :hash="device.meta.hash" :key="device.name" :device="device.name" :room="device.room.name" :type="device.type.name" ></DeviceCard>

    </v-row>
  </v-container>
</template>

<script>
import DeviceCard from "@/components/Devices/DeviceCard";

export default {
  name: "DevicesView",
  data() {
    return {
    }
  },
  methods: {

  },
  props: ['devices'],
  components: {
    DeviceCard
  }
}
</script>

<style scoped>

</style>