<template >
  <v-container :class="!adding && elements.length === 0? 'fill-height' : ''">
    <div v-if="!adding && elements.length === 0" class="flex-column d-flex justify-center content-center pa-2">
      <div class="text--blue-grey lighten-4"><slot name="no-elements-title"></slot></div>
      <div class="text-sm-body-2"><slot name="no-elements-body"> </slot> </div>
    </div>
    <v-row class='d-flex justify-center grid-row my-6' >
      <ElementButton v-for="element in elements.sort()" :key="element" :element="element" :prop="prop"/>
      <slot/>
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
      return this.$store.getters[this.prop.elements].map(e => e.name)
    }
  },
  props: ['prop', 'adding']
}
</script>

<style scoped>

</style>