<template>
  <div>
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >Habitación {{
        this.converter(roomName) }}</div>

    <AddButton v-if='!editing' @onClick="addDevice"></AddButton>
    <EditButton setter='toggleEditTheRoomPressed' class='edit-button' edit-button-getter="editTheRoomPressed"></EditButton>
    <CloseButton @onClick="close"/>
    <div v-for="group in groups" :key="group">
      <v-slide-x-transition mode="out-in">
        <div class="pa-1 mt-3 mb-2 ml-4 font-weight-medium">
          <div>
            {{converter(group)}}
          </div>
          <DevicesView :devices = "selectDevices(group)" :key="filteredDevices.length"></DevicesView>
        </div>
      </v-slide-x-transition>
    </div>
  </div>
</template>

<script>
import AddButton from "@/components/ViewButtons/AddButton";
import CloseButton from "@/components/ViewButtons/CloseButton";
import DevicesView from "@/components/Devices/DevicesView";
import EditButton from "@/components/ViewButtons/EditButton";
import {slugToText} from "../../utils/Utils";
import {mapGetters, mapState} from "vuex";
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
      converter: slugToText,
    }
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
      return this.filteredDevices.filter(e => e.group === group)
    }
  },
  computed: {
    ...mapState(['devices']),
    editing() {
      return this.$store.state.editTheRoomPressed
    },
    filteredDevices() {
      return this.devices.filter(e => e.room === this.$route.params.room)
    },
    groups() {
      return new Set(this.filteredDevices.map(e => e.group))
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