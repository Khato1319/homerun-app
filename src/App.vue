<template>
  <div id="app">
    <v-app class="overflow-hidden">
      <TheHeader @onClickLogo="restorePage" @onClickHelp="()=>{restorePage();openHelp()}"/>
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
                <v-tab-item key="roomView" class="overflow-container">
                  <v-slide-x-transition mode="out-in">
                    <ElementButtons cols="6" :prop="roomButtonsProp" :adding="addingRoom">
                      <template v-slot:no-elements-title>
                        La pestaña "Habitaciones" está vacía.
                      </template>
                      <template v-slot:no-elements-body >
                        Prueba crear una utilizando el <v-icon color="primary">mdi-plus-circle</v-icon> o ve a <router-link to="/help">Ayuda</router-link> para saber más.
                      </template>
                      <InputComponent v-show="addingRoom" ref='roomInput' placeholder='Nueva habitación' setter="selectRoom"
                                      @valueSubmitted="addToRooms" input-value=""/>
                    </ElementButtons>
                  </v-slide-x-transition>
                  <AddButton key='roomAdd' v-show="!editRoomPressed && selectedRoom === ''" @onClick="addRoom"/>

                  <EditButton class='edit-button' toggler="toggleEditRoomPressed" key='roomEdit'
                              setter="toggleEditRoomPressed" v-show="!addingRoom && selectedRoom === ''" edit-button-getter="editRoomPressed"/>
                </v-tab-item>
                <v-tab-item key="routineView" class="scrollbar overflow-tab" >
                  <AddButton key="routineAdd" v-show="!editRoutinePressed && selectedRoutine === ''"
                             @onClick="addRoutine"/>

                  <EditButton class='edit-button' key='routineEdit' v-show="!addingRoutine && selectedRoutine === ''"
                              toggler="toggleEditRoutinePressed" edit-button-getter="editRoutinePressed"/>
                  <v-slide-x-transition mode="out-in">
                    <ElementButtons cols="6"
                                     :prop="routineButtonsProp" :adding="addingRoutine">
                      <template v-slot:no-elements-title>
                        La pestaña "Rutinas" está vacía.
                      </template>
                      <template v-slot:no-elements-body >
                        Prueba crear una utilizando el <v-icon color="primary">mdi-plus-circle</v-icon> o ve a <router-link to="/help">Ayuda</router-link> para saber más.
                        Recuerda tener al menos algún dispositivo para poder crearla.
                      </template>
                      <InputComponent v-show="addingRoutine" ref='routineInput' placeholder='Nueva rutina'
                                      setter="selectRoutine" @valueSubmitted="addToRoutines" input-value=""/>
                    </ElementButtons>
                  </v-slide-x-transition>
                </v-tab-item>
              </v-tabs>
            </v-col>

            <v-col >
              <v-slide-x-reverse-transition mode="out-in">
                <v-card height="100%" class="py-3 px-2"  :key="$route.fullPath">
                  <router-view :key="$route.fullPath" cols="6" class="fill-height"/>
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
import AddButton from "@/components/ViewButtons/AddButton";
import TheHeader from "@/components/TheHeader";
import ElementButtons from "@/components/Elements/ElementButtons"
import EditButton from "@/components/ViewButtons/EditButton";
import InputComponent from "./components/Elements/InputComponent.vue";
import {mapActions} from "vuex"

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
      recent: this.recent,
      addToRecent: this.addToRecent,
    }
  },
  data() {
    return {
      tab: null,
      addingRoom: false,
      addingRoutine: false,
      routineButtonsProp: {
        setter: 'selectRoutine',
        selected: "selectedRoutine",
        routerName: "routine",
        deleter: "routine/delete",
        editor: 'routine/modify',
        name: 'rutina',
        elements: 'routine/getRoutines',
        editPressed: 'editRoutinePressed'
      },
      roomButtonsProp: {
        setter: 'selectRoom',
        selected: "selectedRoom",
        routerName: "room",
        deleter: "room/delete",
        editor: 'room/modify',
        name: 'habitación',
        elements: 'room/getRooms',
        editPressed: 'editRoomPressed'
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
  beforeMount() {
    this.restorePage()
  },
  mounted() {
    this.$store.dispatch('device/getAll')
    this.$store.dispatch('room/getAll')
    this.$store.dispatch('routine/getAll')
  },
  methods: {
    toTitleCase(phrase) {
      return phrase
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    },
    ...mapActions("room", {
      $createRoom: "create",
      $modifyRoom: "modify",
      $deleteRoom: "delete",
      $getAllRooms: "getAll"
    }),

    ...mapActions("routine", {
      $createRoutine: "create",
      $modifyRoutine: "modifyName",
      $deleteRoutine: "delete",
      $getAllRoutines: "getAll"
    }),

    async addToRooms(value) {
      this.addingRoom = false;

      try {
        await this.$createRoom(this.toTitleCase(value))
      } catch(e) {
        console.log(e)
      }
    },
    addToRoutines(value) {
      this.addingRoutine = false;
      this.$store.commit('selectRoutine', value)
      this.$router.push({ name: 'addRoutine', params: { routine:  value}})
      // this.routines.push({routine: value, actions: undefined});
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
      this.$store.commit('selectRoutine', '')
      this.$store.commit('selectRoom', '')
      this.$store.commit('setEditRoomPressed', false);
      this.$store.commit('setEditRoutinePressed', false);
      if(this.$route.fullPath !== "/")
        this.$router.push("/");
    },
    openHelp(){
      this.$router.push('/help')
    }

  },
  computed: {
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
.edit-button {
  top: 10px;
  right: 25px;
}

.overflow-container {
  overflow-y: scroll; height: 80vh
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.overflow-tab {
  overflow-y: scroll;
  height: 80vh
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
