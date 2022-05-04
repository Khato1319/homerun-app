<template>
<div>
  Room is {{$route.params.room}}
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
export default {
  name: "RoomView",
  components: {
    AddButton,
    CloseButton,
    DevicesView
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