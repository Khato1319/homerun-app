<template>

  <v-btn
      width="200"
      height="50"
      color="blue lighten-4"  :elevation="8" depressed x-large class="ma-6" >

    <input
        style="width: 200px; height: 50px ; font-size: 18px"
        :style = "{textAlign: inputVal === '' ? 'left': 'center'}"
        @click.stop class="blue lighten-4 text-uppercase px-2"
        type="text" v-model="inputVal"
        @keydown.enter="submitValue"
        :placeholder="placeholder"
        ref='inputElem'
    />
  </v-btn>





</template>

<script>
import { mapState } from "vuex";
import {slugToText} from "../../../utils/Utils";
export default {

    props: ['placeholder', 'setter', 'inputValue', 'reference'],
    data() {
        return {
          inputVal: this.converter(this.inputValue)
        }
    },
    methods: {
      converter(string) {
        return slugToText(string)
      },
      inputSubmit() {
        return this.inputVal
      },
    submitValue() {
      this.$emit('valueSubmitted',this.inputVal);
    },
      focus() {
        this.$refs.inputElem.focus();
      },
    },
    computed: {
      ...mapState(['devices', 'rooms']),
    }
}

</script>

<style scoped>
::placeholder {
  color: #000000;
  opacity: 20%
}
</style>