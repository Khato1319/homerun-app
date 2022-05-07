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
                    <ElementButtons :editPressed='editRoomPressed' :key="rooms.length" cols="6"
                                    :elements="rooms" :prop="roomButtonsProp"/>
                  </v-slide-x-transition>
                  <AddButton key='roomAdd'  @onClick="addRoom"/>
                  <InputComponent  v-if='addingRoom' ref='roomInput' placeholder='Nueva habitación' setter="selectRoom" @valueSubmitted="addToRooms"/>
                  <EditButton @onClick="editingRoom" key='roomEdit' :editing="editRoomPressed"/>
                </v-tab-item>
                <v-tab-item class="scrollbar" style="overflow-y: scroll; height: 80vh ">
                  <AddButton key="routineAdd"  @onClick="addRoutine"/>
                  <InputComponent  v-if='addingRoutine' ref='routineInput' placeholder='Nueva rutina' setter="selectRoutine" @valueSubmitted="addToRoutines"/>
                  <EditButton key='routineEdit'  @onClick="editingRoutine" :editing="editRoutinePressed"/>
                  <v-slide-x-transition mode="out-in">
                    <ElementButtons :editPressed='editRoutinePressed' :key="routines.length" cols="6"
                                  :elements="routines" :prop="routineButtonsProp"/>
                  </v-slide-x-transition>

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
import {mapGetters, mapState} from "vuex";
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
      addingRoom: false,
      addingRoutine: false,
      editRoutinePressed: false,
      editRoomPressed: false,
      routineButtonsProp: {
        setter: 'selectRoutine',
        selected: "selectedRoutine",
        routerName:"routine",
        deleter: "deleteRoutine",
        editor: 'editRoutineName',
        name: 'rutina',
        elements: 'getRoutines'
      },
      roomButtonsProp: {
        setter: 'selectRoom',
        selected: "selectedRoom",
        routerName:"room",
        deleter: "deleteRoom",
        editor: 'editRoomName',
        name: 'habitación',
        elements: 'getRooms'
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
    ...mapGetters(['selectedRoom', 'selectedRoutine']),
    addToRooms(value){
      this.addingRoom = false;
      this.rooms.push(value);
    },
    addToRoutines(value){
      this.addingRoutine = false;
      this.routines.push(value);
    },
    addRoom() {
      this.addingRoom = !this.addingRoom;
    },
    addRoutine() {
      this.addingRoutine = !this.addingRoutine;
    },
    editingRoom() {
      this.editRoomPressed = !this.editRoomPressed;
    },
    editingRoutine() {
      this.editRoutinePressed = !this.editRoutinePressed;
    },
    restorePage() {
      this.addingRoom = false;
      this.addingRoutine = false;
      this.editRoomPressed = false;
      this.editRoutinePressed = false;
      this.$refs.routineInput.restorePage();
      this.$refs.roomInput.restorePage();
      this.$router.push("/");
    }

  },
  computed: mapState(['devices', 'rooms', 'routines'])
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
