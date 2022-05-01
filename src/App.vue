<template>
  <v-app>
    <div id="app">
      <!--    <nav>-->
      <!--      <router-link to="/">Home</router-link> |-->
      <!--      <router-link to="/about">About</router-link>-->
      <!--    </nav>-->
      <TheHeader/>
      <v-container fluid cols="12">
        <v-card-title>Habitaciones</v-card-title>
        <v-layout>
          <v-row no-gutters>
            <v-col>
              <RoomButtons cols="6" :rooms="rooms"/>
              <div>
                <v-btn
                    color="primary"
                    :elevation="8"
                    depressed
                    x-large
                    class="ma-6"
                    :style="{opacity: addingRoom ? 100 : 0}"
                ><input @click.stop class="primary white--text px-2" type="text"
                        v-model="inputValue" @keydown.enter="enterRoom"
                        placeholder="Nueva habitación"
                        ref="roomadd"/></v-btn>
              </div>

            </v-col>
            <AddButton @onClick="addRoom"></AddButton>
            <v-col>
              <router-view :id="$route.fullPath" cols="6"/>
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import AddButton from "@/components/AddButton";
import TheHeader from "@/components/TheHeader";
import RoomButtons from "@/components/RoomButtons"

export default {
  components: {
    TheHeader,
    RoomButtons,
    AddButton
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      selected: () => this.selectedRoom,
      setter: this.setter,
    }
  },
  data() {
    return {
      rooms: ['Bedroom', 'Living', 'Uno', 'Bathroom'],
      selectedRoom: "",
      inputValue: "",
      addingRoom: false,
      setter: (room) => {
        this.selectedRoom = room;
      }
    }
  },
  methods: {
    addRoom() {
      this.addingRoom = !this.addingRoom;
      if (this.addingRoom)
        this.focusInput();
    },
    enterRoom() {
      this.addingRoom = false;
      this.rooms.push(this.inputValue)
      this.inputValue = ""
    },
    focusInput() {
      console.log("1");
      this.$refs.roomadd.focus();
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
