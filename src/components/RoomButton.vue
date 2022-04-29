<template>
  <div>
    <v-btn
        :color="isActive ? 'light-grey' : 'primary'"
        :elevation="isActive ? 0 : 8"
        depressed
        x-large
        class="ma-6"
        @click="toggle"
    ><slot></slot></v-btn>
  </div>

</template>

<script>
export default {
  name: "RoomButton",
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    }
  }
}
</script>

<style scoped>

</style>