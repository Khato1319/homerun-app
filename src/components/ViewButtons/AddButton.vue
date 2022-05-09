<template>
  <v-slide-x-transition>
  <v-btn class="add-button ml-auto mt-auto ma-2"
         elevation="4"
         fab
         color="primary"
         absolute
         @click="$emit('onClick')"
  ><v-icon>mdi-plus-thick</v-icon>
  </v-btn>
    </v-slide-x-transition>
</template>

<script>
export default {
  name: "AddButton",
  props: ['onClick']
}
</script>

<style scoped>
.add-button {
  bottom: 10px;
  right: 30px;
}
</style>