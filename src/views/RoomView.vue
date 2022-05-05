<template>
<div>
  Room is {{
    this.converter(roomName)
  }}
  <AddButton @onClick="addDevice"></AddButton>
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
import slugConverter from "../../utils/Utils";
export default {
  name: "RoomView",
  components: {
    AddButton,
    CloseButton,
    DevicesView
  },
  data() {
    return {
      roomName: this.$route.params.room,
      converter: slugConverter
    }
  },
  methods: {
    addDevice() {
      this.$router.push({ name: 'addDevice', params: { theRoom: this.selected() } })
    },
    close() {
      this.setter("");
      this.$router.push({ path: '/'})
    }
  },
  inject: ['selected', 'setter', 'devices'],
}
</script>

<style scoped>

</style>