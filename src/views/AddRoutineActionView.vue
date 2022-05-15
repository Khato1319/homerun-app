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
          :items="actions.map(a => a.name)"
          :rules="[v => !!v || 'El item es obligatorio']"
          :label="deviceType === ''? 'Seleccione un dispositivo primero' : 'Acción'"
          required
      ></v-select>
      <v-card v-if="actionObj && actionObj.component !== 'Button'" color="white" class="elevation-4 pa-2 mt-2 mb-5 d-flex justify-center align-content-center">
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
  mounted() {
    this.$store.dispatch('device/getAll')
  },
  data() {
    return {
      routine: this.$route.params.routine,
      devices: this.$store.getters['device/getDevices'].map(d => `${d.name} - ${d.room.name}`).sort(),
      device: '',
      deviceName: '',
      deviceType: '',
      deviceRoom: '',
      action: ''
    }
  },
  watch: {
    device(val) {
      [this.deviceName, this.deviceRoom] = val.split(' - ')
      const device = this.$store.getters['device/getDevice'](this.deviceName)
      this.deviceType = device.type.name
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
      return this.actions.find(a => a.name === this.action)
    }
  },
  methods: {
    validate() {
      let actionValue = undefined;
      if(this.actionObj.component !== 'Button')
        actionValue = this.$refs.actionComp.getActionValue()


      const payload = {
        routineName: this.routine,
        actionName: actionValue ? actionValue.actionName : this.actionObj.props.apiId,
        deviceName: this.deviceName,
        param: actionValue?.value,
        meta: {
          value: actionValue ? actionValue.displayValue : undefined,
          name: this.action
        }
      }
      if (this.$store.getters['routine/getRoutine'](this.routine)) {

        this.$store.dispatch("routine/addAction", payload)
      }
      else {
        // const deviceId = this.$store.getters.device.getDevice(this.deviceName).id
        console.log(this.actionObj)



        console.log(payload)

        this.$store.dispatch("routine/create", payload)
      }

      // this.$store.commit('addActionToRoutine', {routine: this.routine, action: {device: this.deviceName, room: this.deviceRoom, action: this.action, value: actionValue}})
      this.close()
    },
    close() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>