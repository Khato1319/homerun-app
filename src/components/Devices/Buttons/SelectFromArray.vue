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
      let obj
      if ((obj = this.$store.getters[this.getter].find(e => e.value === textToSlug(this.value)))) {
        return [obj.apiValue,this.value]

      }
      return [this.textToSlug(this.value), this.textToSlug(this.value)]
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
      return this.$store.getters[this.getter].map(r => r.value ? this.converter(r.value) : this.converter(r))
    }
  }
}


</script>

<style>

</style>