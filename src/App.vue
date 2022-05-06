<template>
  <div id="app">


    <v-app>
      <TheHeader />
      <v-container class="fill-height ma-0 pa-0" fluid cols="12">
        <v-layout>
          <v-row no-gutters>
            <v-col>
              <v-tabs grow background-color="white" color="primary" v-model="tab">
                <v-tab @click="restorePage">
                  Habitaciones
                </v-tab>
                <v-tab @click="restorePage">
                  Rutinas
                </v-tab>
                <v-tab-item style="overflow-y: scroll; height: 80vh ">
                  <v-slide-x-transition mode="out-in">
                    <ElementButtons :setter='roomSetter' :selected="selectedRoom" :key="rooms.length" cols="6" :elements="rooms" routerName="room" />
                  </v-slide-x-transition>
                  <AddButton key='roomAdd' v-show="selectedRoom === ''" @onClick="addRoom"/>
                  <InputComponent ref='roomInput' placeholder='Nueva habitación'/>
                  <EditButton key='roomEdit' v-show="selectedRoom === ''"/>
                </v-tab-item>
                <v-tab-item class="scrollbar" style="overflow-y: scroll; height: 80vh ">
                  <AddButton key="routineAdd" @onClick="addRoutine"/>
                  <InputComponent ref='routineInput' placeholder='Nueva rutina'/>
                  <EditButton key='routineEdit' v-show="selectedRoutine === ''"/>
                </v-tab-item>
              </v-tabs>


            </v-col>

            <v-col>
              <v-slide-x-reverse-transition mode="out-in">
                <v-card height="100%" class="py-3 px-2" :key="$route.fullPath">
                  <router-view :key="$route.fullPath" cols="6" />
                </v-card>
              </v-slide-x-reverse-transition>

            </v-col>

          </v-row>
        </v-layout>
      </v-container>
    </v-app>
  </div>

</template>

<script>
import AddButton from "@/components/AddButton";
import TheHeader from "@/components/TheHeader";
import ElementButtons from "@/components/ElementButtons"
import EditButton from "@/components/EditButton";
import { mapState } from "vuex";
import InputComponent from "./components/InputComponent.vue";

export default {
  components: {
    EditButton,
    TheHeader,
    ElementButtons,
    AddButton,
    InputComponent
},
  provide() {
    return {
      supportedDevices: this.supportedDevices,
      recent: this.recent,
      addToRecent: this.addToRecent
    }
  },
  data() {
    return {
      roomSetter: (room) => this.selectedRoom = room,
      supportedDevices: new Map([
        ['Lámpara', 'light'],
        ['Aspiradora', 'vacuum'],
        ['Alarma', 'alarm'],
        ['Horno', 'oven'],
        ['Aire Acondicionado', 'a/c']
      ]),
      selectedRoom: "",
      selectedRoutine: "",
      inputValue: "",
      addingRoom: false,
      setter: (room) => {
        this.selectedRoom = room;
      },
      recent: [],
      addToRecent: (string) => {
        if (this.recent.includes(string))
          return;
        if (this.recent.length === 5)
          this.recent.pop();
        this.recent.unshift(string);
      }
    }
  },
  methods: {
    addRoom() {
      this.$refs.roomInput.adding();
    },
    addRoutine() {
      this.$refs.routineInput.adding();
    },
    restorePage() {
      
    }

  },
  computed: mapState(['devices', 'rooms'])
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ECEFF1;
  opacity: 1;
  /* Firefox */
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

/* background of the scrollbar except button or resizer */
::-webkit-scrollbar-track {
  background-color: #fff;
}

/* scrollbar itself */
::-webkit-scrollbar-thumb {
  background-color: #CFD8DC;
  border-radius: 16px;
  border: 4px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-thumb:active {
  background-color: #90A4AE;
}
</style>
