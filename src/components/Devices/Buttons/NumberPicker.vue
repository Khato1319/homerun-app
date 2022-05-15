<template>


<div >
  <div class="text-sm-left ml-3 mt-6 mb-6 primary--text">{{label}}: {{value}}{{statusParam === 'temperature' ? '°C':''}}{{label.toLowerCase().includes('porcentaje') ? '%':''}}
  </div>
  <v-slider
      thumb-color="primary"
      thumb-label
      thumb-size="28"
      v-model="value"
      :min = "this.min"
      :max = "this.max"
      @change="changeHandler"
      :disabled="checkDisabled()"

  ></v-slider>
</div>




</template>

<script>
export default {
  name: "NumberPicker",
  props: ["label", "min", "max", "apiId", "deviceView",'name', 'state', 'statusParam', 'disable'],
  methods: {
    getActionValue() {
      return {
        displayValue: this.value.toString() + (this.statusParam === 'temperature' ? '°C':'') + (this.label.toLowerCase().includes('porcentaje') ? '%':''),
        value: this.value,
        actionName: this.apiId
      }
    },
    checkDisabled() {
      if (this.disable && this.deviceView)
        return this.state.status !== 'opened' && this.state.status !== 'closed'

      return false
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
    if (this.deviceView) {
      this.value = this.componentState
    }
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