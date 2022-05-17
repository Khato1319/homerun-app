<template>
  <div>
    <div class="mt-5">
      <div class="text-sm-left ml-3 mt-6 mb-3 primary--text">{{title}}</div>
      <v-select
          :items="items"
          :label="this.label"
          outlined
          v-model="value"
          @change="changeHandler"
      ></v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectFromArray",
  props: ["getter", "label", 'title', 'deviceView','apiId','name', 'state', 'statusParam'],
  data() {
    return {
      value: null
    }
  },
  beforeMount() {
    if (this.deviceView) {
      this.$store.dispatch('room/getAll')
      this.value = this.componentState
    }
  },
  methods: {
    getActionValue() {
      const obj = this.$store.getters[this.getter].find(e => e.value === this.value)

      return {
          displayValue: this.value,
          value: obj.apiValue,
          actionName: this.apiId
        }
    },
    changeHandler() {
      if (this.deviceView) {
        const payload = {
          name: this.name,
          param: this.$store.getters[this.getter].find(e => e.value === this.value).apiValue,
          action: this.apiId
        }
        this.$store.dispatch('device/applyAction', payload)
      }
    }
  },
  computed: {
    items(){
      return this.$store.getters[this.getter].map(r => r.value)
    },
    componentState() {
      let stateValue
      if (this.statusParam instanceof Array) {
        stateValue = this.state[this.statusParam[0]][this.statusParam[1]]
      }
      else stateValue = this.state[this.statusParam]
      console.log(stateValue)
      return this.$store.getters[this.getter].find(e => e.apiValue === stateValue).value
      // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
    }
  }
}


</script>

<style scoped>

</style>