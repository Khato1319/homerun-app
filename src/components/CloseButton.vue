<template>
  <v-btn @click="close">Cerrar</v-btn>
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

</style>