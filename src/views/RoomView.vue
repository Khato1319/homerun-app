<template>
<div>
  Room is {{$route.params.room}}
  <AddButton @onClick="addDevice"></AddButton>
  <CloseButton @onClick="close"/>

</div>
</template>

<script>
import AddButton from "@/components/AddButton";
import CloseButton from "@/components/CloseButton";
export default {
  name: "RoomView",
  components: {
    AddButton,
    CloseButton
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
  inject: ['selected', 'setter'],
}
</script>

<style scoped>

</style>