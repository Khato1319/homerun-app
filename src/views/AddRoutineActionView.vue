<template>
  <div>
    Agregando acción a rutina {{


      converter(routine)
    }}
    <v-spacer></v-spacer>
    <CloseButton @onClick="close"></CloseButton>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >


      <v-select
          v-model="device"
          :items="devices"
          :rules="[v => !!v || 'El item es obligatorio']"
          label="Dispositivo"
          required
      ></v-select>

      <v-select
          v-model="action"
          :disabled="deviceType === ''"
          :items="actions"
          :rules="[v => !!v || 'El item es obligatorio']"
          :label="deviceType === ''? 'Seleccione un dispositivo primero' : 'Acción'"
          required
      ></v-select>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Agregar
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {slugToText, textToSlug} from "../../utils/Utils";

export default {
  name: "AddRoutineActionView",
  data() {
    return {
      routine: this.$route.params.routine,
      devices: this.$store.state.devices.map(d => `${slugToText(d.name)} - ${slugToText(d.room)}`).sort(),
      device: '',
      deviceName: '',
      deviceType: '',
      deviceRoom: '',
      action: ''
    }
  },
  watch: {
    device(val) {
      [this.deviceName, this.deviceRoom] = val.split(' - ').map(x => textToSlug(x))
      const device = this.$store.state.devices.find(d => d.name === this.deviceName && d.room === this.deviceRoom)
      this.deviceType = device.type
    }
  },
  computed: {
    valid() {
      return this.action !== '' && this.deviceName !== '' && this.deviceRoom !== ''
    },
    actions() {
      if (this.deviceType === '')
        return []
      else return this.$store.state.supportedDevices.find(d => d.type === this.deviceType).actions.map(a => slugToText(a.name))
    }
  },
  methods: {
    validate() {
      this.action = textToSlug(this.action)
      this.$store.commit('addActionToRoutine', {routine: this.routine, action: {device: this.deviceName, room: this.deviceRoom, action: this.action}})
      this.close()
    },
    converter(s) {
      return slugToText(s)
    },
    close() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>