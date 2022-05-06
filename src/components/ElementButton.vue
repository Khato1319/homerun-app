<template>
  <div>
    <v-btn
        width="180"
        height="50"
        :color="selectedValue === element ? 'primary' : 'blue lighten-4'"
        :elevation="selectedValue === element ? 4 : 8"
        depressed
        class="ma-6 px-1 element-button"
        @click="toggle"
    > <span class="text-truncate" style="max-width:150px">{{converter(element)}}</span></v-btn>
  </div>
</template>

<script>
import slugConverter from "../../utils/Utils";

export default {
  name: "ElementButton",
  props: ['element', 'setter', 'selected', 'routerName'],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    selectedValue() {
      return this.$store.getters[this.selected];

    }

  },
  methods: {
    converter(string) {
      return slugConverter(string);
    },
    toggle() {
      if (this.selectedValue !== this.element) {
        this.$store.commit(this.setter, this.element);
        this.$router.push({ name: this.routerName, params: { [this.routerName]: this.element } })
      }
      else {
        this.$store.commit(this.setter, '');
        this.$router.push({ path: '/'});

      }
    }
  },
}
</script>

<style scoped>
.element-button {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>