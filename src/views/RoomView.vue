<template>
  <div>
    Habitación {{
      this.converter(roomName)
    }}
    <AddButton @onClick="addDevice"></AddButton>
    <EditButton @onClick="editDevice"></EditButton>
    <CloseButton @onClick="close"/>
    <DevicesView :devices = "devices.filter(e => e.room === $route.params.room)"></DevicesView>
  <!--  <DeviceCard :key="device.name" v-for="device in devices.filter(e => e.room === $route.params.room)"-->
  <!--  :device="device.name" :room="device.room"></DeviceCard>-->
  </div>
</template>

<script>
import AddButton from "@/components/AddButton";
import CloseButton from "@/components/CloseButton";
import DevicesView from "@/components/DevicesView";
import EditButton from "@/components/EditButton";
import {textToSlug} from "../../utils/Utils";
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
      converter: textToSlug
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

    }
  },
  computed: mapState(['devices'])
}
</script>

<style scoped>

</style>