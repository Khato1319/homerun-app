<template>
  <v-btn class="delete-btn" fab x-small><v-icon>mdi-delete</v-icon></v-btn>
</template>

<script>
export default {
  name: "HelpDeleteButton"
}
</script>

<style scoped>
.delete-btn {
  width: 25px;
  height: 25px;
  pointer-events: none
}
</style>