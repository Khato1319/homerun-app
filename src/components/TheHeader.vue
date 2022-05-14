<template>
  <v-app-bar
      elevation="4"
      color="primary"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{on, attrs}">
        <!--    Podría ponerse un espacio porque por ahora queda muy pegado-->
        <v-btn text width="40" height="50" @click="$emit('onClick')" class="mr-2" v-bind="attrs" v-on="on">
          <v-img height="50" width="50" src="@/assets/HR-Logo-Nameless-Shape.png"/>
        </v-btn>
      </template>
      <span>Página principal de HomeRun</span>
    </v-tooltip>


    <v-toolbar-title class="white--text mr-auto" style="font-family:Shrikhand,Nunito">HomeRun</v-toolbar-title>

    <v-tooltip bottom>
      <template v-slot:activator="{on, attrs}">
        <v-btn color="white" class="mr-2" fab small outlined @click=openHelp v-bind="attrs" v-on="on" >
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