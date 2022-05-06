<template>
  <v-container>
    <v-row>
      <RoomButton v-for="element in elements" :key="element" :element="element"/>
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
  props: ['elements', 'setter', 'selected']
}
</script>

<style scoped>

</style>