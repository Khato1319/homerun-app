<template>
<div>
  Room is {{$route.params.room}}
  <AddButton @onClick="addDevice"></AddButton>
</div>
</template>

<script>
import AddButton from "@/components/AddButton";
export default {
  name: "RoomView",
  components: {
    AddButton
  },
  methods: {
    addDevice() {
      this.$router.push({ name: 'addDevice', params: { room: this.selected() } })
    }
  },
  inject: ['selected'],
}
</script>

<style scoped>

</style>