<template>
  <div>
    <space/>
    <v-btn
        width="170"
        height="50"
        :color="selected === element ? 'primary' : 'blue lighten-4'"
        :elevation="selected === element ? 4 : 8"
        depressed
        class="ma-6"
        @click="toggle"
    >{{element}}</v-btn>
  </div>
</template>

<script>


export default {
  name: "ElementButton",
  props: ['element', 'setter', 'selected', 'routerName'],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.setter(this.element);
      this.router.push({ name: this.routerName, params: { [this.routerName]: this.element } })
    }
  },
}
</script>

<style scoped>

</style>