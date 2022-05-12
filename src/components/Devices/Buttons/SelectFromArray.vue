<template>
  <v-container cols="12">
    <v-row>
      <v-col cols="4">
          <v-select
              :items="this.$store.getters[this.getter].map(r => this.converter(r))"
              :label="this.label"
              outlined
              v-model="value"
          ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {slugToText, textToSlug} from "../../../../utils/Utils";
export default {
  name: "SelectFromArray",
  props: ["getter", "label"],
  data() {
    return {
      value: ''
    }
  },
  methods: {
    getActionValue() {
      return [this.textToSlug(this.value), this.value]
    },
    converter(s) {
      return slugToText(s)
    },
    textToSlug(s) {
      return textToSlug(s)
    }
  }
}


</script>

<style>

</style>