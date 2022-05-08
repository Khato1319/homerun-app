<template>
  <v-app-bar
      elevation="4"
      color="primary"
  >
    <v-btn width="50" height="50">
<!--      <v-img height="50" width="50" src="@/assets/favicon.ico"/>-->
    </v-btn>
<!--    Podría ponerse un espacio porque por ahora queda muy pegado-->
    <v-toolbar-title class="white--text mr-auto" style="font-family:Shrikhand">HomeRun</v-toolbar-title>
    <v-btn rounded>
      <v-icon>mdi-help</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Shrikhand&display=swap');
</style>