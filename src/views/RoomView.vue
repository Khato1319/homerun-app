<template>
  <div class="overflow-y-hidden main-container">
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >
      <span class="font-weight-bold">Habitación </span>"{{roomName }}"
    </div>
    <div v-if="roomDevices.length === 0" class="fill-height d-flex flex-column justify-center content-center pa-2">
      <div class="text--blue-grey lighten-4">La habitación {{roomName}} no tiene dispositivos</div>
      <div class="text-sm-body-2 help-height" >Prueba agregar uno utilizando el <v-icon color="primary">mdi-plus-circle</v-icon>, o ve a <router-link to="/help">Ayuda</router-link> para saber más.</div>
    </div>

    <AddButton v-if='!editing' @onClick="addDevice"/>
    <EditButton toggler='toggleEditTheRoomPressed' class='edit-button' edit-button-getter="editTheRoomPressed"/>
    <CloseButton @onClick="close"/>
    <div class="overflow-container">
      <div v-for="group in groups" :key="group" >
        <v-slide-x-transition mode="out-in">
          <div class="pa-1 mt-3 mb-2 ml-4 font-weight-medium">
            <div class="primary--text font-weight-medium">
              Grupo: {{group}}
            </div>
            <DevicesView :devices = "selectDevices(group)" :key="selectDevices(group).length"/>
          </div>
        </v-slide-x-transition>
      </div>
      <div class="pa-1 mt-3 mb-2 ml-4 font-weight-medium" v-if="selectDevices('').length > 0">
        <div class="primary--text font-weight-medium">
          Sin grupo
        </div>
        <DevicesView :devices = "selectDevices('')" :key="selectDevices('').length"/>
      </div>
  </div>

  </div>
</template>

<script>
import AddButton from "@/components/ViewButtons/AddButton";
import CloseButton from "@/components/ViewButtons/CloseButton";
import DevicesView from "@/components/Devices/DevicesView";
import EditButton from "@/components/ViewButtons/EditButton";
import {mapGetters} from "vuex";
export default {
  name: "RoomView",
  components: {
    AddButton,
    CloseButton,
    EditButton,
    DevicesView
  },
  data() {
    return {
      roomName: this.$route.params.room,
    }
  },
  async beforeMount() {
    this.$store.commit('setEditTheRoomPressed', false)
    await this.$store.dispatch('device/getAll')
    await this.$store.dispatch('room/getAll')
  },
  methods: {
    ...mapGetters(['selectedRoom']),
    addDevice() {
      this.$router.push({ name: 'addDevice', params: { theRoom:  this.selectedRoom()} })
    },
    close() {
      this.$store.commit('selectRoom',"");
      this.$router.push({ path: '/'})
    },
    editDevice(){
      this.editing = !this.editing
    },
    selectDevices(group) {
      return this.roomDevices.filter(e => e.meta.group === group).sort()
    }
  },
  computed: {
    editing() {
      return this.$store.state.editTheRoomPressed
    },
    roomDevices() {
      if (this.$store.getters['device/getDevices'].length === 0)
        return []
      return this.$store.getters['device/getDevices'].filter(e => e.room.name === this.$route.params.room)
    },
    groups() {
      const set = new Set(this.roomDevices.map(e => e.meta.group))
      set.delete('')
      return set
    }
  }
}
</script>

<style scoped>
.main-container{
  height: 85vh
}
.help-height{
  height: 200px
}
.overflow-container {
  overflow-y: scroll;
  height: 74vh
}
.edit-button {
  top: 25px;
  right: 60px;
}
</style>