<template>
  <v-container cols="12">
    <v-row>
      <v-col cols="4">
          <v-select
              :items="items"
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
      const obj = this.$store.getters[this.getter].find(e => e.value === this.value)

      return {
          displayValue: this.value,
          value: obj.apiValue,
          actionName: this.apiId
        }
    },
    converter(s) {
      return slugToText(s)
    },
    textToSlug(s) {
      return textToSlug(s)
    },
  },
  computed: {
    items(){
      return this.$store.getters[this.getter].map(r => r.value)
    }
  }
}


</script>

<style>

</style>