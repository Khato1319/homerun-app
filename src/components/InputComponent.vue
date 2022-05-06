<template>

    <v-btn color="primary" :elevation="8" depressed x-large class="ma-6" :style="{ opacity: addingBoolean ? 100 : 0 }"><input
            @click.stop class="primary white--text px-2" type="text" v-model="inputValue"
            @keydown.enter="submitValue" :placeholder="placeholder" ref='inputElem' /></v-btn>
</template>

<script>
import { mapState } from "vuex";
export default {

    props: ['placeholder', 'setter'],
    data() {
        return {
            addingBoolean: false,
          inputValue: ''
        }
    },
    methods: {
    adding() {
        this.addingBoolean = !this.addingBoolean;
        this.$refs.inputElem.focus();
    },
    restorePage() {
      this.$store.commit(this.setter, '');
      this.addingBoolean = false;
    },
    submitValue() {
    console.log('submitted');
      this.addingBoolean = false;
      this.rooms.push(this.inputValue);
      this.inputValue = ""
    },
    },
    computed:  mapState(['devices', 'rooms'])
}

</script>

<style scoped>
</style>