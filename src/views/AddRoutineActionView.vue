<template>
  <div>
    <div>

      <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-bold primary--text" >Agregando acción a rutina "{{



          routine
        }}"</div>
    <v-spacer/>
    <CloseButton @onClick="close"/>
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
      <div v-if="deviceName && hash && !passwordChecked">
        <v-text-field
            v-model="password"
            label="Ingrese la contraseña"
            class="white--text mx-3 my-2"
            :color="color"
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            :hint="incorrectMsg"
            required
            @keypress.enter="checkPwd"
            ref="pwdInput"
            @blur="() => {this.incorrectMsg = ''; this.color = 'primary'; this.value = true}"
        ></v-text-field>
        <v-btn color="success" v-if="deviceName" @click="checkPwd" class="text-sm-button" :disabled="password === ''">Ingresar</v-btn>

      </div>



      <div v-if="(passwordChecked || (device && hash === null))">
        <div v-if="hash !== null && !(actionObj && actionObj.component !== 'Button')" class="primary--text text-sm-caption font-weight-medium">
          Acceso concedido. Seleccione la acción para agregar a la rutina
        </div>
        <v-select
            v-model="action"
            :disabled="deviceType === ''"
            :items="actions.map(a => a.name)"
            :rules="[v => !!v || 'El item es obligatorio']"
            :label="deviceType === ''? 'Seleccione un dispositivo primero' : 'Acción'"
            required
        ></v-select>
        <div v-if="actionObj && actionObj.component !== 'Button'"   class="primary--text font-weight-medium text-sm-caption">
          Seleccione el estado final del dispositivo deseado
        </div>

        <v-card v-if="actionObj && actionObj.component !== 'Button'" color="white" class="elevation-4 pa-2 mt-2 mb-5">
          <component :is="actionObj.component" ref="actionComp"  v-bind="actionObj.props"></component>
        </v-card>


        <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
        >
          Agregar
        </v-btn>
      </div>


    </v-form>
  </div>
    </div>
</template>

<script>
import CloseButton from "@/components/ViewButtons/CloseButton";
import OnOff from "@/components/Devices/Buttons/OnOff";
import NumberPicker from "@/components/Devices/Buttons/NumberPicker";
import SelectFromArray from "@/components/Devices/Buttons/SelectFromArray";
import PlayPause from "@/components/Devices/Buttons/PlayPause";
import ColorPicker from "@/components/Devices/Buttons/ColorPicker";
import SwitchButton from "@/components/Devices/Buttons/SwitchButton";
import {hashCode} from "../../utils/Utils";
export default {
  name: "AddRoutineActionView",
  components: {
    OnOff,
    CloseButton,
    NumberPicker,
    SelectFromArray,
    PlayPause,
    ColorPicker,
    SwitchButton
  },
  mounted() {
    this.$store.dispatch('device/getAll')
  },
  data() {
    return {
      routine: this.toTitleCase(this.$route.params.routine),
      devices: this.$store.getters['device/getDevices'].map(d => `${d.name} - ${d.room.name}`).sort(),
      device: '',
      deviceName: '',
      deviceType: '',
      deviceRoom: '',
      action: '',
      value: false,
      hash: null,
      password: "",
      passwordChecked: false,
      incorrectMsg: "",
      color: 'primary'
    }
  },
  watch: {
    device(val) {
      [this.deviceName, this.deviceRoom] = val.split(' - ')
      const device = this.$store.getters['device/getDevice'](this.deviceName)
      this.deviceType = device.type.name
      this.hash = device.meta.hash
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
    checkPwd() {
      if (this.hash === hashCode(this.password)) {
        this.color = 'primary'
        this.passwordChecked = true

      }
      else {
        this.color = 'red'
        this.incorrectMsg = "La contraseña es incorrecta"
      }
    },
    toTitleCase(phrase) {
      return phrase
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    },
    async validate() {
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

        await this.$store.dispatch("routine/addAction", payload)
        this.close()
      }
      else {
        // const deviceId = this.$store.getters.device.getDevice(this.deviceName).id
        console.log(this.actionObj)

        await this.$store.dispatch("routine/create", payload)
        this.$store.commit('selectRoutine', this.routine)

        await this.$router.push({name: 'routine', params: {routine: this.routine}})
      }

      // this.$store.commit('addActionToRoutine', {routine: this.routine, action: {device: this.deviceName, room: this.deviceRoom, action: this.action, value: actionValue}})

    },
    close() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>