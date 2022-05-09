<template>
<div>
  {{converter(deviceName)}} Light
  <CloseButton @onClick="close"/>
  <OnOff/>
  <PlayPause/>
  <ColorPicker/>
  <NumberPicker min="0" max="100" label="Horno °C"/>
  <SelectFromArray :items="['Foo', 'Bar', 'Fizz', 'Buzz']"/>
  <SecurityCode/>
</div>
</template>

<script>
import CloseButton from "@/components/ViewButtons/CloseButton";
import {slugToText} from "../../../utils/Utils";
import OnOff from "@/components/Devices/Buttons/OnOff";
import PlayPause from "@/components/Devices/Buttons/PlayPlause";
import ColorPicker from "@/components/Devices/Buttons/ColorPicker";
import NumberPicker from "@/components/Devices/Buttons/NumberPicker";
import SelectFromArray from "@/components/Devices/Buttons/SelectFromArray";
import SecurityCode from "@/components/Devices/Buttons/SecurityCode";

export default {
  name: "LightView",
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
    }
  },
  data() {
    return {
      deviceName: this.$route.params.deviceName,
      converter: slugToText
    }
  }
}
</script>

<style scoped>

</style>