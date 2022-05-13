<template>
  <div>
    Agregando acción a rutina {{


      converter(routine)
    }}
    <v-spacer></v-spacer>
    <CloseButton @onClick="close"></CloseButton>
    <v-form
        ref="form"

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
          :items="actions.map(a => converter(a.name))"
          :rules="[v => !!v || 'El item es obligatorio']"
          :label="deviceType === ''? 'Seleccione un dispositivo primero' : 'Acción'"
          required
      ></v-select>
      <v-card v-if="actionObj && actionObj.component" color="white" class="elevation-4 pa-2 mt-2 mb-5 d-flex justify-center align-content-center">
          <component :is="actionObj.component" ref="actionComp"  v-bind="actionObj.props"></component>
      </v-card>

      <v-btn
          :disabled="!valid"
          color="success"
          @click="validate"
      >
        Agregar
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {slugToText, textToSlug} from "../../utils/Utils";

import CloseButton from "@/components/ViewButtons/CloseButton";
import OnOff from "@/components/Devices/Buttons/OnOff";
import NumberPicker from "@/components/Devices/Buttons/NumberPicker";
import SelectFromArray from "@/components/Devices/Buttons/SelectFromArray";
import PlayPause from "@/components/Devices/Buttons/PlayPause";
import ColorPicker from "@/components/Devices/Buttons/ColorPicker";
export default {
  name: "AddRoutineActionView",
  components: {
    OnOff,
    CloseButton,
    NumberPicker,
    SelectFromArray,
    PlayPause,
    ColorPicker
  },
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
      this.action = ''
    }
  },
  computed: {
    valid() {
      return this.deviceType !== '' && this.deviceName !== '' && this.deviceRoom !== '' && this.action !== ''
    },
    actions() {
      if (this.deviceType === '')
        return []
      else {
        return this.$store.state.supportedDevices.find(d => d.type === this.deviceType).actions
      }
    },
    actionObj() {
      return this.actions.find(a => a.name === textToSlug(this.action))
    }
  },
  methods: {
    validate() {
      this.action = textToSlug(this.action)
      let actionValue = undefined;
      if(this.actionObj.component)
        actionValue = this.$refs.actionComp.getActionValue()

      this.$store.commit('addActionToRoutine', {routine: this.routine, action: {device: this.deviceName, room: this.deviceRoom, action: this.action, value: actionValue}})
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