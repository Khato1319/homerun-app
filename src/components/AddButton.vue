<template>
  <v-btn class="ml-auto mt-auto ma-2"
         elevation="4"
         fab
         color="primary"
         @click="$emit('onClick')"
  >+
  </v-btn>
</template>

<script>
export default {
  name: "AddButton",
  props: ['onClick']
}
</script>

<style scoped>

</style>