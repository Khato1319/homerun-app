<template>
  <v-btn class="close-button"
         elevation="0"
         color="primary"
         fab
         plain
         absolute
         small
      @click="close"
  ><v-icon>mdi-window-close</v-icon>
    </v-btn>
</template>

<script>
export default {
  name: "CloseButton",
  methods: {
    close() {
      this.$emit('onClick');
    }
  }
}
</script>

<style scoped>
.close-button {
  top: 23px;
  right: 10px;
}
</style>