<template class="">
  <v-container >
    <v-row class='d-flex justify-center grid-row my-6'>
      <ElementButton :editPressed='editPressed' v-for="element in elements" :key="element" :element="element" :prop="prop" />
    </v-row>
  </v-container>
</template>

<script>
import ElementButton from "./ElementButton.vue";

export default {
  name: "ElementButtons",
  components: {
    ElementButton
},
  data() {
    return {}
  },
  props: ['elements', 'prop', 'editPressed']
}
</script>

<style scoped>

</style>