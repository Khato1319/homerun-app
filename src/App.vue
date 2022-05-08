<template>
  <div id="app">


    <v-app>
      <TheHeader/>
      <v-container class="fill-height ma-0 pa-0" fluid cols="12">
        <v-layout>
          <v-row no-gutters>
            <v-col>
              <v-tabs grow background-color="white" color="primary">
                <v-tab @click="restorePage">
                  Habitaciones
                </v-tab>
                <v-tab @click="restorePage">
                  Rutinas
                </v-tab>
                <v-tab-item style="overflow-y: scroll; height: 80vh ">
                  <v-slide-x-transition mode="out-in">
                    <ElementButtons :key="rooms.length" cols="6"
                                    :elements="rooms" :prop="roomButtonsProp"/>
                  </v-slide-x-transition>
                  <AddButton key='roomAdd' v-show="!editRoomPressed && selectedRoom === ''" @onClick="addRoom"/>
                  <InputComponent v-show="addingRoom" ref='roomInput' placeholder='Nueva habitación' setter="selectRoom"
                                  @valueSubmitted="addToRooms"/>
                  <EditButton toggler="toggleEditRoomPressed" key='roomEdit'
                              v-show="selectedRoom === ''" edit-button-getter="editRoomPressed"/>
                </v-tab-item>
                <v-tab-item class="scrollbar" style="overflow-y: scroll; height: 80vh ">
                  <AddButton key="routineAdd" v-show="!editRoutinePressed && selectedRoutine === ''"
                             @onClick="addRoutine"/>
                  <InputComponent v-show="addingRoutine" ref='routineInput' placeholder='Nueva rutina'
                                  setter="selectRoutine" @valueSubmitted="addToRoutines"/>
                  <EditButton key='routineEdit' v-show="selectedRoutine === ''"
                              toggler="toggleEditRoutinePressed" edit-button-getter="editRoutinePressed"/>
                  <ElementButtons :key="routines.length" cols="6"
                                  :elements="routines" :prop="routineButtonsProp"/>
                </v-tab-item>
              </v-tabs>


            </v-col>

            <v-col>
              <v-slide-x-reverse-transition mode="out-in">
                <v-card height="100%" class="py-3 px-2" :key="$route.fullPath">
                  <router-view :key="$route.fullPath" cols="6"/>
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
import {mapState} from "vuex";
import InputComponent from "./components/InputComponent.vue";

export default {
  components: {
    EditButton,
    TheHeader,
    ElementButtons,
    AddButton,
    InputComponent
  },
  watch: {
    selectedRoom(val) {

      if(val !== '') {
        this.$store.commit('setEditRoomPressed', false);
        this.addingRoom = false;
      }

    },
    selectedRoutine(val) {
      if (val !== '') {
        this.$store.commit('setEditRoutinePressed', false);
        this.addingRoutine = false;
      }
    },
    addingRoom() {
      setTimeout(() => this.$refs.roomInput.focus(), 300)
    },
    addingRoutine() {
      setTimeout(() => this.$refs.routineInput.focus(), 300)
    },
  },
  provide() {
    return {
      supportedDevices: this.supportedDevices,
      recent: this.recent,
      addToRecent: this.addToRecent,
    }
  },
  data() {
    return {
      addingRoom: false,
      addingRoutine: false,
      routineButtonsProp: {
        setter: 'selectRoutine',
        selected: "selectedRoutine",
        routerName: "routine",
        deleter: "deleteRoutine",
        editor: 'editRoutineName',
        name: 'rutina',
        elements: 'getRoutines',
        editPressed: 'editRoutinePressed'
      },
      roomButtonsProp: {
        setter: 'selectRoom',
        selected: "selectedRoom",
        routerName: "room",
        deleter: "deleteRoom",
        editor: 'editRoomName',
        name: 'habitación',
        elements: 'getRooms',
        editPressed: 'editRoomPressed'

      },
      supportedDevices: new Map([
        ['Lámpara', 'light'],
        ['Aspiradora', 'vacuum'],
        ['Alarma', 'alarm'],
        ['Horno', 'oven'],
        ['Aire Acondicionado', 'a/c']
      ]),
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
    addToRooms(value) {
      this.addingRoom = false;
      this.rooms.push(value);
    },
    addToRoutines(value) {
      this.addingRoutine = false;
      this.routines.push(value);
    },
    addRoom() {
      this.addingRoom = !this.addingRoom;
    },
    addRoutine() {
      this.addingRoutine = !this.addingRoutine;
    },
    restorePage() {
      this.addingRoom = false;
      this.addingRoutine = false;
      this.$refs.routineInput.restorePage();
      this.$refs.roomInput.restorePage();
      this.$store.commit('setEditRoomPressed', false);
      this.$store.commit('setEditRoutinePressed', false);
      this.$router.push("/");
    }

  },
  computed: {
    ...mapState(['devices', 'rooms', 'routines']),
    selectedRoom() {
      return this.$store.getters.selectedRoom;
    },
    selectedRoutine() {
      return this.$store.getters.selectedRoutine;
    },
    editRoomPressed() {
      return this.$store.state.editRoomPressed
    },
    editRoutinePressed() {
      return this.$store.state.editRoutinePressed
    },
  }
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
