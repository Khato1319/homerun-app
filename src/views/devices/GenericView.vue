<template>
  <div >
    <div   class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >{{converter(dispositivo)}} {{converter(deviceName)}}</div>
    <CloseButton @onClick="close"/>
    <v-card  v-for="action in actions" :key="action.name" color="white" class="elevation-4 pa-2 mt-2 mb-5 d-flex justify-center align-center">
      <div v-if="action.component">
        <component   :state='state' :is="action.component" v-bind="action.props" :name="deviceName" :deviceView="true" @valueChanged="processChange"></component>
      </div>
      <div v-else><v-btn>{{action.action}}</v-btn></div>
    </v-card>
  </div>
</template>

<script>
import CloseButton from "@/components/ViewButtons/CloseButton";
import {slugToText} from "../../../utils/Utils";
import OnOff from "@/components/Devices/Buttons/OnOff";
import PlayPause from "@/components/Devices/Buttons/PlayPause";
import ColorPicker from "@/components/Devices/Buttons/ColorPicker";
import NumberPicker from "@/components/Devices/Buttons/NumberPicker";
import SelectFromArray from "@/components/Devices/Buttons/SelectFromArray";
import SecurityCode from "@/components/Devices/Buttons/SecurityCode";

export default {
  name: "GenericView",
  components: {
    SecurityCode,
    SelectFromArray,
    NumberPicker,
    ColorPicker,
    PlayPause,
    OnOff,
    CloseButton
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    processChange(value, actionName) {
      console.log(value)
      console.log(actionName)
    },
    actionEvent() {
      this.counter += 1
    }
  },
  props: ['deviceType','dispositivo','deviceName', 'deviceId'],
  data() {
    return {
      converter: slugToText,
      counter: 0,
    }
  },
  computed: {
    actions() {
      return this.$store.state.supportedDevices.find(d => d.type === this.deviceType).actions
    },
    state() {
      return this.$store.getters['device/getDevice'](this.deviceName).state
    }
  }
}
</script>

<style scoped>

</style>