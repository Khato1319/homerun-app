<template>
  <v-container>
    <v-row>
      <ElementButton v-for="element in elements" :key="element" :element="element" :setter='setter' :selected='selected' :routerName='routerName'/>
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
  props: ['elements', 'setter', 'selected', 'routerName']
}
</script>

<style scoped>

</style>