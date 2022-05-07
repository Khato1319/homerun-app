<template>

    <v-btn color="primary" :elevation="8" depressed x-large class="ma-6" ><input
            @click.stop class="primary white--text px-2" type="text" v-model="input"
            @keydown.enter="submitValue" :placeholder="placeholder" ref='inputElem' /></v-btn>
</template>

<script>
import { mapState } from "vuex";
export default {

    props: ['placeholder', 'setter', 'inputValue'],
    data() {
        return {
          addingBoolean: false,
          input: this.inputValue
        }
    },
    methods: {
    restorePage() {
      this.$store.commit(this.setter, '');
      this.addingBoolean = false;
    },
    submitValue() {
      this.addingBoolean = false;
      this.$emit('valueSubmitted',this.input);
    },
    },
    computed:  mapState(['devices', 'rooms'])
}

</script>

<style scoped>
</style>