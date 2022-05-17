<template>
  <v-btn class="delete-btn" fab x-small><v-icon>{{icon}}</v-icon></v-btn>
</template>

<script>
export default {
  name: "HelpButton",
  props: ["icon"]
}
</script>

<style scoped>
.delete-btn {
  width: 25px;
  height: 25px;
  pointer-events: none
}
</style>