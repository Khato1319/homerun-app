<template>
  <div id="app">


    <v-app>
      <TheHeader/>
      <v-container class="fill-height ma-0 pa-0" fluid cols="12">
        <v-layout>
          <v-row no-gutters>
            <v-col>
              <v-tabs
                  fixed-tabs
                  background-color="white"
                  color="primary"
                  v-model="tab"
              >
                <v-tab @click="restorePage">
                  Habitaciones
                </v-tab>
                <v-tab @click="restorePage">
                  Rutinas
                </v-tab>
                <v-tab-item style="overflow-y: scroll; height: 80vh ">
<!--                  <v-btn>EDITAR</v-btn>-->

                  <v-slide-x-transition mode="out-in">
                    <RoomButtons :key="rooms.length" cols="6" :rooms="rooms"/>
                  </v-slide-x-transition>
                  <v-btn
                      color="primary"
                      :elevation="8"
                      depressed
                      x-large
                      class="ma-6"
                      :style="{opacity: addingRoom ? 100 : 0}"
                  ><input @click.stop class="primary white--text px-2" type="text"
                          v-model="inputValue" @keydown.enter="enterRoomValue"
                          placeholder="Nueva habitación"
                          ref="roomadd"/></v-btn>
                  <AddButton key='roomAdd' v-show="selectedRoom === ''" @onClick="addRoom"></AddButton>
                  <EditButton key='roomEdit' v-show="selectedRoom === ''" ></EditButton>
                </v-tab-item>
                <v-tab-item class="scrollbar" style="overflow-y: scroll; height: 80vh ">Rutinas
                  <AddButton key="routineAdd" @onClick="addRoom"></AddButton>
                  <EditButton key='roomEdit'></EditButton>
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
import RoomButtons from "@/components/RoomButtons"
import EditButton from "@/components/EditButton";
import {mapMutations, mapState} from "vuex";

export default {
  components: {
    EditButton,
    TheHeader,
    RoomButtons,
    AddButton
  },
  provide() {
    return {
      selected: () => this.selectedRoom,
      setter: this.setter,
      supportedDevices: this.supportedDevices,
      recent: this.recent,
      addToRecent: this.addToRecent
    }
  },
  data() {
    return {
      supportedDevices: new Map([
        ['Lámpara', 'light'],
        ['Aspiradora', 'vacuum'],
        ['Alarma', 'alarm'],
        ['Horno', 'oven'],
        ['Aire Acondicionado', 'a/c']
      ]),
      selectedRoom: "",
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
    ...mapMutations([
                   'addRoom',
        'addDevice'
                 ]),
    addRoom() {
      this.addingRoom = !this.addingRoom;
      if (this.addingRoom)
        this.focusInput();
    },
    restorePage() {
      this.$router.push("/");
      this.selectedRoom = "";
    },
    enterRoomValue() {
      this.addingRoom = false;
      this.addRoom(this.inputValue);
      this.inputValue = ""
    },
    focusInput() {
      this.$refs.roomadd.focus();
    },
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

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ECEFF1;
  opacity: 1; /* Firefox */
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

::-webkit-scrollbar{
  background-color: #fff;
  width: 16px;
}

/* background of the scrollbar except button or resizer */
::-webkit-scrollbar-track{
  background-color: #fff;
}

/* scrollbar itself */
::-webkit-scrollbar-thumb{
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
