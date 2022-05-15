<template>
  <div>
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >
      Habitación {{roomName }}
    </div>

    <AddButton v-if='!editing' @onClick="addDevice"></AddButton>
    <EditButton toggler='toggleEditTheRoomPressed' class='edit-button' edit-button-getter="editTheRoomPressed"></EditButton>
    <CloseButton @onClick="close"/>
    <div style="overflow-y: scroll; height: 74vh">
      <div v-for="group in groups" :key="group" >
        <v-slide-x-transition mode="out-in">
          <div class="pa-1 mt-3 mb-2 ml-4 font-weight-medium">
            <div>
              {{group}}
            </div>
            <DevicesView :devices = "selectDevices(group)" :key="selectDevices(group).length"></DevicesView>
          </div>
        </v-slide-x-transition>
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
      return this.roomDevices.filter(e => e.meta.group === group)
    }
  },
  computed: {
    editing() {
      return this.$store.state.editTheRoomPressed
    },
    roomDevices() {
      let devices=this.$store.getters['device/getDevices']
      if (devices.length === 0)
        return []
      return devices.filter(e => e.room.name === this.$route.params.room)
    },
    groups() {
      return new Set(this.roomDevices.map(e => e.meta.group))
    }
  }
}
</script>

<style scoped>
.edit-button {
  top: 25px;
  right: 60px;
}
</style>