<template>
  <div>
    <div class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" ><span class="font-weight-bold">{{dispositivo}}</span> "{{deviceName}}"</div>
    <CloseButton @onClick="close"/>
    <div class="overflow-container">
      <v-card   v-if="this.$slots.default" color="white" class="pa-2 ma-2">
        <slot/>
      </v-card>
      <v-card  v-for="action in actions"  :key="action.name" color="white" class="pa-2 ma-2">
        <div  >
          <component   :state='state' :is="action.component" v-bind="action.props" :name="deviceName" :deviceView="true" @valueChanged="processChange"/>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/ViewButtons/CloseButton";
import OnOff from "@/components/Devices/Buttons/OnOff";
import PlayPause from "@/components/Devices/Buttons/PlayPause";
import ColorPicker from "@/components/Devices/Buttons/ColorPicker";
import NumberPicker from "@/components/Devices/Buttons/NumberPicker";
import SelectFromArray from "@/components/Devices/Buttons/SelectFromArray";
import SecurityCode from "@/components/Devices/Buttons/SecurityCode";
import SwitchButton from "@/components/Devices/Buttons/SwitchButton";
import Button from "@/components/Devices/Buttons/Button";

export default {
  name: "GenericView",
  components: {
    SecurityCode,
    SelectFromArray,
    NumberPicker,
    ColorPicker,
    PlayPause,
    OnOff,
    CloseButton,
    SwitchButton,
    Button
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    processChange(value, actionName) {
      console.log(value)
      console.log(actionName)
    },
    pollData () {
      this.polling = setInterval(() => {
        console.log('polling')
        this.$store.dispatch('device/getAll')
      }, 3000)
    }
  },
  props: ['deviceType','dispositivo','deviceName', 'deviceId'],
  data() {
    return {
      counter: 0,
      polling: null
    }
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  created () {
    this.pollData()
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
.overflow-container {
  overflow-y: scroll;
  height: 74vh
}
</style>