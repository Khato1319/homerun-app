<template>
  <v-slide-x-transition>
    <v-btn  class="edit-btn"
            elevation="4"
            :color="color"
            :key="editing ? 'editing' : 'not-editing'"
            absolute
            rounded
            @click="clickHandler"
    >
      <v-icon v-if="!editing">mdi-pencil</v-icon>
      <div v-else class="edit-text">LISTO</div>
    </v-btn>

  </v-slide-x-transition>
</template>

<script>
export default {
  name: "EditButton",
  data() {
    return {
      color: 'primary'
    }
  },
  methods: {
    clickHandler() {
      this.$store.commit(this.toggler)
    },
  },
  computed: {
    editing() {
      return this.$store.state[this.editButtonGetter]
    }
  },
  props: ['editButtonGetter', 'toggler']
}
</script>

<style scoped>
.edit-btn {
  height: 35px
}

.edit-text {
  font-size: 14px;
}
</style>