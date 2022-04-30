<template>

  <div>
    <v-app-bar color="primary" class="d-flex justify-space-around">
      <v-btn class="mx-2" :color="recentDevices ? 'light-grey' : 'primary'"
             :elevation="recentDevices ? 0 : 8" @click="toggle">Dispositivos Recientes
      </v-btn>

      <v-btn class="mx-2" :color="routines ? 'light-grey' : 'primary'"
             :elevation="routines ? 0 : 8" @click="toggle">Rutinas
      </v-btn>
    </v-app-bar>

    <RecentsView v-if="recentDevices"></RecentsView>

    <RoutinesView v-if="routines"></RoutinesView>
  </div>

</template>


<script>
// @ is an alias to /src
import RoutinesView from "@/components/RoutinesView";
import RecentsView from "@/components/RecentsView";


export default {
  name: 'HomeView',
  components: {
    RoutinesView,
    RecentsView
  },
  data() {
    return {
      recentDevices: true,
      routines: false,
    }
  },
  methods: {
    toggle() {
      this.routines = !this.routines;
      this.recentDevices = !this.recentDevices
    }
  }
}
</script>
