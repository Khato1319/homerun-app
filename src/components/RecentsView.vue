<template>
  <v-container >
    <v-row>
      <DeviceCard v-for="num in [1, 2, 3, 4,5,6]" :key="num">{{ num }}</DeviceCard>
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