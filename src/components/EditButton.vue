<template>
  <v-slide-x-transition>
    <v-btn class="edit-button" style="height: 35px"
                              elevation="4"
                              :color="color"
                              :key="editing ? 'editing' : 'not-editing'"
                              absolute
                              rounded
                              @click="clickHandler"
    ><v-icon v-if="!editing">mdi-pencil</v-icon>
      <div class="edit-text">{{editing ? 'LISTO' : ''}}</div>
    </v-btn>

  </v-slide-x-transition>
</template>

<script>
export default {
  name: "EditButton",
  data() {
    return {
      color: 'primary',
      editing: false
    }
  },
  methods: {
    clickHandler() {
      this.editing = !this.editing;
      this.$emit('onClick')
      if (this.editing)
        this.$emit('editFinished')
    },
  },
  props: ['onClick']
}
</script>

<style scoped>
.edit-button {
  top: 10px;
  right: 25px;
}

.edit-text {
  font-size: 14px;
}
</style>