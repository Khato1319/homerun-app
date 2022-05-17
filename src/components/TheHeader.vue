<template>
  <v-app-bar
      elevation="4"
      color="primary"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{on, attrs}">
        <v-btn text width="40" height="50" @click="$emit('onClickLogo')" class="mr-2" v-bind="attrs" v-on="on">
          <v-img height="50" width="50" src="@/assets/HR-Logo-Nameless-Shape.png"/>
        </v-btn>
      </template>
      <span>Página principal de HomeRun</span>
    </v-tooltip>

    <v-toolbar-title class="white--text mr-auto toolbar-title" >HomeRun</v-toolbar-title>

    <v-tooltip bottom>
      <template v-slot:activator="{on, attrs}">
        <v-btn color="white" class="mr-2" fab small outlined @click="$emit('onClickHelp')" v-bind="attrs" v-on="on">
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </template>
      <span>Ayuda</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Shrikhand&display=swap');

.toolbar-title {
  font-family: Shrikhand, sans-serif;
}
</style>