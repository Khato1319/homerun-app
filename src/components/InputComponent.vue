<template>

  <v-btn
      width="200"
      height="50"
      color="blue lighten-4"  :elevation="8" depressed x-large class="ma-6" >

    <input
        style="width: 200px; height: 50px ; font-size: 18px"
        :style = "{textAlign: input === '' ? 'left': 'center'}"
        @click.stop class="blue lighten-4 text-uppercase px-2"
        type="text" v-model="input"
        @keydown.enter="submitValue"
        :placeholder="placeholder"
        ref='inputElem'
    />
  </v-btn>





</template>

<script>
import { mapState } from "vuex";
export default {

    props: ['placeholder', 'setter', 'inputValue'],
    data() {
        return {
          input: this.inputValue
        }
    },
    methods: {
    restorePage() {
      this.$store.commit(this.setter, '');
    },
    submitValue() {
      this.$emit('valueSubmitted',this.input);
    },
    },
    computed:  mapState(['devices', 'rooms'])
}

</script>

<style scoped>
::placeholder {
  color: #000000;
  opacity: 20%
}
</style>