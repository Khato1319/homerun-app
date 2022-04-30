<template>
  <v-container>
    <v-row>
      <RoomButton v-for="room in rooms" :key="room" :room="room" ></RoomButton>
    </v-row>
  </v-container>
</template>

<script>
import RoomButton from "@/components/RoomButton";

export default {
  name: "RoomButtons",
  components: {
    RoomButton
  },
  data() {
    return {}
  },
  props: ['rooms']
}
</script>

<style scoped>

</style>