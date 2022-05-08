<template class="">
  <v-container >
    <v-row class='d-flex justify-center grid-row my-6' >
      <ElementButton v-for="element in elements" :key="element" :element="element" :prop="prop" />
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
    return {
      id: 0
    }
  },
  computed: {
    elements() {
      return this.$store.getters[this.prop.elements]
    }
  },
  props: ['prop', 'editPressed']
}
</script>

<style scoped>

</style>