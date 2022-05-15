<template>


<div >
  <div class="text-sm-left ml-3 mt-6 mb-6 primary--text">{{label}}: {{value}}{{statusParam === 'temperature' ? '°C':''}}</div>
  <v-slider
      thumb-color="primary"
      thumb-label
      thumb-size="28"
      v-model="value"
      :min = "this.min"
      :max = "this.max"
      @change="changeHandler"

  ></v-slider>
</div>




</template>

<script>
export default {
  name: "NumberPicker",
  props: ["label", "min", "max", "apiId", "deviceView",'name', 'state', 'statusParam'],
  methods: {
    getActionValue() {
      return {
        displayValue: this.value.toString() + (this.statusParam === 'temperature' ? '°C':''),
        value: this.value,
        actionName: this.apiId
      }
    },
    changeHandler() {
      if (this.deviceView) {
        const payload = {
          name: this.name,
          param: this.value,
          action: this.apiId
        }
        this.$store.dispatch('device/applyAction', payload)
      }
    }
  },
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    this.value = this.componentState
  },
  computed: {
    componentState() {
      if (this.deviceView) {
        return this.state[this.statusParam]
      }
      return this.value
      // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
    }
  }

}
</script>

<style>


</style>