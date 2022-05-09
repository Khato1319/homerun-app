<template>
  <div>
    <v-card-title  class="justify-space-between text-caption">Habitación {{
        this.converter(roomName)
      }}</v-card-title>

    <AddButton @onClick="addDevice"></AddButton>
    <EditButton setter='toggleEditTheRoomPressed' class='edit-button' edit-button-getter="editTheRoomPressed"></EditButton>
    <CloseButton @onClick="close"/>
    <DevicesView :devices = "devices.filter(e => e.room === $route.params.room)"></DevicesView>
  <!--  <DeviceCard :key="device.name" v-for="device in devices.filter(e => e.room === $route.params.room)"-->
  <!--  :device="device.name" :room="device.room"></DeviceCard>-->
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
    }
  },
  computed: {
    ...mapState(['devices']),
    editing() {
      return this.$store.state.editTheRoomPressed
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