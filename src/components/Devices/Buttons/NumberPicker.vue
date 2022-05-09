<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-slider class="picker"
                  :label="this.label"
                  thumb-color="primary"
                  thumb-label="always"
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
}
</script>

<style>


</style>