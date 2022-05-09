<template>
  <v-container cols="12">
    <v-row>
      <v-col cols="4">
          <v-select
              :items="this.items"
              :label="this.label"
              outlined
          ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SelectFromArray",
  props: ["items", "label"]
}


</script>

<style>

</style>