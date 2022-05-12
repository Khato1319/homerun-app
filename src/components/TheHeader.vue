<template>
  <v-app-bar
      elevation="4"
      color="primary"
  >
    <v-btn text width="40" height="50" @click="$emit('onClick')" class="mr-2">
      <v-img height="50" width="50" src="@/assets/HR-Logo-Nameless-Shape.png"/>
    </v-btn>
<!--    Podría ponerse un espacio porque por ahora queda muy pegado-->
    <v-toolbar-title class="white--text mr-auto" style="font-family:Shrikhand,Nunito">HomeRun</v-toolbar-title>
    <v-btn color="blue lighten-4" rounded @click="openHelp">
      <v-icon>mdi-help</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",

  methods: {
    openHelp(){
      this.$router.push('/help')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Shrikhand&display=swap');
</style>