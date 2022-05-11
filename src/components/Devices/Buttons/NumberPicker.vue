<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-slider class="picker"
                  :label="this.label"
                  thumb-color="primary"
                  thumb-label
                  v-model="value"
                  :min = "this.min"
                  :max = "this.max"
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NumberPicker",
  props: ["label", "min", "max"],
  methods: {
    getActionValue() {
      return [this.value, this.value.toString()]
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


</style>