<template>
  <v-btn
      width="200"
      height="50"
      color="blue lighten-4"  :elevation="8" depressed x-large class="ma-6" >

    <input
        :style = "{textAlign: inputVal === '' ? 'left': 'center'}"
        @click.stop class="blue lighten-4 text-uppercase px-2 input-comp"
        type="text" v-model="inputVal"
        @keydown.enter="submitValue"
        :placeholder="placeholder"
        ref='inputElem'
    />
  </v-btn>
</template>

<script>
export default {
    props: ['placeholder', 'setter', 'inputValue', 'reference'],
    data() {
        return {
          inputVal: this.inputValue
        }
    },
    methods: {
      inputSubmit() {
        return this.inputVal
      },
    submitValue() {
      this.$emit('valueSubmitted',this.inputVal);
      this.inputVal = ""
    },
      focus() {
        this.$refs.inputElem.focus();
      },
    }
}

</script>

<style scoped>
::placeholder {
  color: #000000;
  opacity: 20%
}
.input-comp {
  width: 200px;
  height: 50px;
  font-size: 18px
}
</style>