<template>


<div  class="slider">
  <v-slider
      :label="this.label"
      thumb-color="primary"
      thumb-label
      v-model="value"
      :min = "this.min"
      :max = "this.max"

  ></v-slider>
</div>




</template>

<script>
export default {
  name: "NumberPicker",
  props: ["label", "min", "max", "apiId"],
  methods: {
    getActionValue() {
      return {
        displayValue: this.value.toString(),
        value: this.value,
        actionName: this.apiId
      }
    }
  },
  data() {
    return {
      value: this.min
    }
  }
}
</script>

<style>
.slider {
  width: 300px;
}

</style>