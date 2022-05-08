<template>
  <div style="position: relative" >


      <v-btn
          width="180"
          height="50"
          :color="selectedValue === element ? 'primary' : 'blue lighten-4'"
          :elevation="selectedValue === element ? 4 : 8"
          depressed
          class="ma-6 px-1 element-button"
          @click="toggle"
          v-if="!editPressed || !editing"
      ><span class="text-truncate" style="max-width:150px">{{ converter(element) }}</span>

      </v-btn>

      <v-slide-x-transition>
      <InputComponent ref='inputElem' placeholder='Habitación' v-show="editPressed && editing" @valueSubmitted="changeName" :inputValue="this.element"></InputComponent>
      </v-slide-x-transition>


    <v-fab-transition>
      <v-btn v-if="editPressed && !editing" mode="out-in" fab x-small id="delete-button" @click.stop="deleteElementDialog">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn v-if="editPressed && !editing" fab x-small id="edit-button" @click.stop="editElement">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog
        v-model="dialog"
        width="500"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2 text-center">
          Borrado de {{ this.prop.name }}
        </v-card-title>

        <v-card-text>
          ¿Está seguro de que quiere borrar la {{ this.prop.name }} {{ converter(this.element) }}?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="deleteElement"
          >
            Borrar
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {slugToText} from "../../utils/Utils";
import InputComponent from "@/components/InputComponent";

export default {
  name: "ElementButton",
  components: {InputComponent},

  props: ['element', 'prop'],
  watch: {
    editing(newVal) {
      if (newVal)
        setTimeout(() => this.$refs.inputElem.focus(), 200)
    },
    editPressed(val, prev) {
      let value;
      if (this.editing && val === false && prev === true && this.element !== (value = this.$refs.inputElem.inputSubmit())){
        this.$store.commit(this.prop.editor,{name: this.element, newName: value});
        this.editing = false
      }
    },
  },
  data() {
    return {
      isActive: false,
      dialog: false,
      editing: false
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
    changeName(name) {
      this.editing = false;
      this.$store.commit(this.prop.editor, { name: this.element, newName: name})
    },
    deleteElementDialog() {
      document.activeElement.blur();
      this.dialog = true;
    },
    deleteElement() {
      this.$store.commit(this.prop.deleter, this.element);
    },
    editElement() {
      document.activeElement.blur();
      this.editing = true;
      // this.$refs.inputElem.adding(this.element);
    },
    converter(string) {
      return slugToText(string);
    },
    toggle() {
      if (this.selectedValue !== this.element) {
        this.$store.commit(this.prop.setter, this.element);
        this.$router.push({name: this.prop.routerName, params: {[this.prop.routerName]: this.element}})
      } else {
        this.$store.commit(this.prop.setter, '');
        this.$router.push({path: '/'});

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

#delete-button {
  line-height: 12px;
  width: 25px;
  height: 25px;
  font-size: 8pt;
  margin-top: 8px;
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