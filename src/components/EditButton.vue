<template>
  <v-slide-x-transition>
    <v-btn class="edit-button"
           elevation="4"
           color="primary"
           outlined
           absolute
           rounded
           @click="$emit('onClick')"
    ><v-icon>mdi-pencil</v-icon>
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
export default {
  name: "EditButton",
  props: ['onClick']
}
</script>

<style scoped>
.edit-button {
  top: 10px;
  right: 50px;
}
</style>