<template>
  <div>
    <v-btn
        :color="selected() === room ? 'primary' : 'blue lighten-4'"
        :elevation="selected() === room ? 4 : 8"
        depressed
        x-large
        class="ma-6"
        @click="toggle"
    >{{room }}</v-btn>
  </div>

</template>

<script>


export default {
  name: "RoomButton",
  inject: ['setter', 'selected'],
  props: ['room'],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    selected() {
      return this.selected();
    }
  },
  methods: {
    toggle() {
      this.setter(this.room);
      this.$router.push({ name: 'rooms', params: { room: this.room,  slug: this.room.replace(' ','_').toLowerCase() } })
    }
  },
}
</script>

<style scoped>

</style>