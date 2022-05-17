<template>
  <div class="relative" >
      <v-btn
          width="200"
          height="50"
          :color="selectedValue === element ? 'primary' : 'blue lighten-4'"
          :elevation="selectedValue === element ? 4 : 8"
          depressed
          class="ma-6 px-1 element-button"
          @click="toggle"
          v-if="!editPressed || !editing"
      >
        <span class="text-truncate max-w-150" >{{element}}</span>
      </v-btn>

      <v-slide-x-transition>
        <InputComponent ref='inputElem' placeholder='Habitación' v-show="editPressed && editing" @valueSubmitted="changeName" :inputValue="this.element"/>
      </v-slide-x-transition>

    <v-fab-transition>
      <v-btn v-if="editPressed && !editing" fab x-small id="delete-button" @click.stop="deleteElementDialog">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn v-if="editPressed && !editing" fab x-small id="edit-button" @click.stop="editElement">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>

    <DialogModal @setDialog='(val) => this.dialog = val' :dialog="dialog"  @acceptEvent="deleteElement" @cancelEvent="() => this.dialog = false">
      <template v-slot:title>
        Borrado de {{prop.name}}
      </template>
      ¿Está seguro de que quiere borrar la {{ prop.name }} {{ element }}?
      <span v-if="prop.name === 'habitación'">Se borrarán todos los dispositivos asociados.</span>
    </DialogModal>
  </div>
</template>

<script>
import InputComponent from "@/components/Elements/InputComponent";
import DialogModal from "@/components/Elements/DialogModal";

export default {
  name: "ElementButton",
  components: {InputComponent, DialogModal},

  props: ['element', 'prop'],
  watch: {
    editing(newVal) {
      if (newVal)
        setTimeout(() => this.$refs.inputElem.focus(), 200)
    },
    async editPressed(val, prev) {
      let value;
      if (this.editing && val === false && prev === true){
        if (this.element !== (value = this.$refs.inputElem.inputSubmit()))
          await this.changeName(value)
        this.editing = false;
      }
    },
  },
  data() {
    return {
      isActive: false,
      dialog: false,
      editing: false,
    }
  },
  computed: {
    selectedValue() {
      return this.$store.getters[this.prop.selected];
    },
    editPressed() {
      return this.$store.state[this.prop.editPressed]
    }

  },
  methods: {
    async changeName(name) {
      this.editing = false;
      await this.$store.dispatch(this.prop.editor, { name: this.element, newName: name})
    },
    deleteElementDialog() {
      document.activeElement.blur();
      this.dialog = true;
    },
    async deleteElement() {
      await this.$store.dispatch(this.prop.deleter, this.element);
    },
    editElement() {
      document.activeElement.blur();
      this.editing = true;
    },
    toggle() {
      if (!this.editPressed && this.selectedValue !== this.element) {
        this.$store.commit(this.prop.setter, this.element);
        const toPush = {name: this.prop.routerName, params: {[this.prop.routerName]: this.element}}
        this.editing = false
        this.$router.push(toPush)
      } else {
        this.$store.commit(this.prop.setter, '');
        this.$router.push({path: '/'});
      }
    }
  },
}
</script>

<style scoped>
.max-w-150 {
  max-width: 150px
}
.relative {
  position: relative
}
.element-button {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px
}

#delete-button {
  line-height: 12px;
  width: 25px;
  height: 25px;
  font-size: 8pt;
  margin-top: 12px;
  margin-right: 8px;
  position: absolute;
  top: 0;
  right: 0;
}

#edit-button {
  line-height: 12px;
  width: 25px;
  height: 25px;
  font-size: 8pt;
  margin-top: 60px;
  margin-right: 8px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>