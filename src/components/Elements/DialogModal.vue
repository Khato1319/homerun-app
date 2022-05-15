<template>
  <v-dialog
      width="500"
      v-model="dialogState"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2 text-center">
        <slot name="title"/>
      </v-card-title>
      <v-card-text>
        <slot/>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="red"
            text
            @click="()=> $emit('acceptEvent')"
        >
          Borrar
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="()=> $emit('cancelEvent')"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogModal",
  data() {
    return {
    }
  },
  props: ['dialog'],
  computed: {
    dialogState: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit('setDialog', val)
      }
    }
  }
}
</script>

<style scoped>

</style>