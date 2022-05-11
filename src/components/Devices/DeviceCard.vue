<template>
  <v-card
      elevation="4"
      rounded
      class="pa-2 ma-4 white--text"
      color="primary"
      style="position: relative ; max-width: 300px"
  >
    <DialogModal @setDialog='(val) => this.dialog = val' :dialog="dialog" @acceptEvent="deleteDevice"
                 @cancelEvent="() => this.dialog = false">
      <template v-slot:title>
        Borrado de dispositivo
      </template>
      ¿Está seguro de que quiere borrar el dispositivo {{ converter(device) }}?
    </DialogModal>
    <v-fab-transition>
      <v-btn v-if="editPressed && !editingName" mode="out-in" fab x-small id="delete-button"
             @click.stop="deleteDeviceDialog">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn v-if="editPressed && !editingName" fab x-small id="edit-button" @click.stop="editElement">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
    <div class="d-flex justify-space-between align-content-center" style="max-width: 100%">
      <div class="d-flex flex-column" style="max-width: 100%">
        <div class="d-flex align-center justify-space-between" style="max-width: 100%">
          <input style="color: white ; max-width: 70%" class='ma-1 title-input text-md-left font-weight-bold' @keypress.enter='submitValue' ref='inputElem'                                :disabled="!editPressed || !editingName" type="text" v-model="input">
          <v-btn class="mx-2"
                 fab
                 dark
                 v-if="!submittingPwd"
                 small
                 color="blue-grey lighten-4"
                 @click="()=> {addToRecents(); goToDeviceView()}">
            <v-icon dark >
              mdi-cog
            </v-icon>
          </v-btn>
        </div>

        <v-card-subtitle class="text-sm-left ma-1 pa-0">{{ converter(room) }}</v-card-subtitle>

      </div>

    </div>
    <div class="d-flex justify-center align-content-center">
      <v-btn
          fab
          dark
          large
          :color="clicked ? 'white' : 'blue-grey lighten-4'" @click="()=>{clicked = !clicked; addToRecents()}"
          elevation="8"
          v-if="!hasPassword"

      >
        <v-icon :color="clicked ? 'blue-grey lighten-4' : 'white'">
          {{icon}}
        </v-icon>

      </v-btn>
    </div>
    <v-text-field v-if="submittingPwd"
                  v-model="password"
                  label="Ingrese la contraseña"
                  class="white--text mx-3 my-2"
                  :color="color"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :hint="incorrectMsg"
                  required
                  ref="pwdInput"
                  @blur="() => {this.incorrectMsg = ''; this.color = 'white'; this.value = true}"
    ></v-text-field>
    <v-btn         color="success" v-if="submittingPwd" @click="checkPwd" class="text-sm-button" :disabled="password === ''">Ingresar</v-btn>

  </v-card>
</template>

<script>
import {hashCode, slugToText} from "../../../utils/Utils";
import DialogModal from "@/components/Elements/DialogModal";

export default {
  name: "DeviceCard",
  data() {
    return {
      dialog: false,
      clicked: false,
      input: this.converter(this.device),
      editingName: false,
      password: '',
      submittingPwd: false,
      incorrectMsg: '',
      color: 'white',
      value: true,
    }
  },
  components: {
    DialogModal
  },
  props: ['room', 'device', 'type'],
  inject: ['addToRecent'],
  watch: {
    editPressed(val) {
      if (!val)
        this.submitValue()
    }
  },
  methods: {
    checkPwd() {
      const hash = this.$store.getters.getDevice(this.device, this.room).hash
      console.log(hash)
      console.log(hashCode(this.password))
      if (hashCode(this.password) === hash) {
        this.goToDevice()
      }
      else {
        this.color = 'red darken-4'
        this.incorrectMsg = 'La contraseña es incorrecta'
        this.$refs.pwdInput.focus();
      }

    },
    editElement() {
      document.activeElement.blur();
      this.editingName = true;
      setTimeout(() => this.$refs.inputElem.focus(), 200)
      // todo: editado de dispositivo
    },
    deleteDeviceDialog() {
      document.activeElement.blur();
      this.dialog = true;
    },
    submitValue() {
      this.$store.commit('editDeviceName', {name: this.device, room: this.room, newName: this.input})
      this.dialog = false;
      this.editingName = false
    },
    deleteDevice() {
      // todo: borrado de dispositivo
      console.log('borrando')
      this.$store.commit('deleteDevice', {name: this.device, room: this.room})
      this.dialog = false;
    },
    converter(string) {
      return slugToText(string)
    },
    goToDeviceView() {
      if (this.hasPassword) {
        this.submittingPwd = true;
      }
     else {
        this.goToDevice()
      }
    },
    goToDevice() {
      this.$store.commit('selectRoom', this.room);
      this.$router.push({name: this.type, params: {deviceName: this.device, room: this.room}})
    },
    addToRecents() {
      this.addToRecent(this.device)
    }
  },
  computed: {
    editPressed() {
      return this.$store.state.editTheRoomPressed
    },
    hasPassword() {
      return this.$store.getters.getDevice(this.device, this.room).hash
    },
    icon() {
      return this.$store.getters.getIcon(this.type)
    }
  }
}
</script>

<style scoped>
/*.v-input--is-focused .v-input__slot {*/
/*  border: 2px solid #005fcc !important;*/
/*  border-bottom-color: rgba(0, 0, 0, 0.38) !important;*/
/*}*/
#delete-button {
  line-height: 12px;
  width: 25px;
  height: 25px;
  font-size: 8pt;
  margin-top: -10px;
  margin-right: -10px;
  position: absolute;
  top: 0;
  right: 0;
}

#edit-button {
  line-height: 12px;
  width: 25px;
  height: 25px;
  font-size: 8pt;
  margin-top: 150px;
  margin-right: -10px;
  position: absolute;
  top: 0;
  right: 0;
}

</style>