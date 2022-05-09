<template>
  <v-slide-x-transition>
    <v-btn  style="height: 35px"
                              elevation="4"
                              :color="color"
                              :key="editing ? 'editing' : 'not-editing'"
                              absolute
                              rounded
                              @click="clickHandler"
    ><v-icon v-if="!editing">mdi-pencil</v-icon>
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


.edit-text {
  font-size: 14px;
}
</style>