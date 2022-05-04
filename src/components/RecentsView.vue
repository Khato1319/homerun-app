<template>
  <v-container >
    <v-row class="d-flex justify-center ">
      <DeviceCard class="pa-2" v-for="num in [1, 2, 3, 4,5,6]" :key="num" device="Luz 1" room="Bedroom"></DeviceCard>
    </v-row>
  </v-container>
</template>

<script>
import DeviceCard from "@/components/DeviceCard";
export default {
  name: "RecentsView",
  components: {
    DeviceCard
  }
}
</script>

<style scoped>

</style>