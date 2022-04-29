<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-app-bar-title class="subtitle-2 font-weight-medium white--text">HomeRun</v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
      >
        <span class="mr-2">?</span>
<!--        <v-icon>mdi-open-in-new</v-icon>-->
      </v-btn>
    </v-app-bar>

    <v-main>
      <RoomButtons>
        <RoomButton>Bedroom</RoomButton>
        <RoomButton>Bedroom</RoomButton>
        <RoomButton>Bedroom</RoomButton>
        <RoomButton>Bedroom</RoomButton>
      </RoomButtons>

    </v-main>
  </v-app>
</template>

<script>
import RoomButton from "@/components/RoomButton";
import RoomButtons from "@/components/RoomButtons";

export default {
  name: 'App',

  components: {
    RoomButton,
    RoomButtons
  },

  data: () => ({
    //
  }),
};
</script>

