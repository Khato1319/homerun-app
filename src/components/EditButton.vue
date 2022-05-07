<template>
  <v-slide-x-transition>
    <v-btn class="edit-button" style="height: 35px"
                              elevation="4"
                              color="primary"
                              absolute
                              rounded
                              @click="$emit('onClick')"
    ><v-icon v-if="!editing">mdi-pencil</v-icon>
      <div class="edit-text">{{editing ? 'LISTO' : ''}}</div>
    </v-btn>

  </v-slide-x-transition>
</template>

<script>
export default {
  name: "EditButton",
  props: ['onClick', 'editing' ]
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