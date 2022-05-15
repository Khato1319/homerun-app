<template>
  <v-card
      elevation="4"
      rounded
      class="pa-2 ma-4 white--text device-card"
      color="primary"

  >
    <DialogModal @setDialog='(val) => this.dialog = val' :dialog="dialog" @acceptEvent="deleteDevice"
                 @cancelEvent="() => this.dialog = false">
      <template v-slot:title>
        Borrado de dispositivo
      </template>
      ¿Está seguro de que quiere borrar el dispositivo {{ device }}? Se borrarán las acciones de rutinas asociadas.
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
    <div class="d-flex max-100" >
      <div class="d-flex flex-column max-100" >
        <div class="d-flex align-center max-100" >
          <input  class='ma-1 title-input text-md-left font-weight-bold device-name' @keypress.enter='submitValue' ref='inputElem' :disabled="!editPressed || !editingName" type="text" v-model="input"/>

          <v-btn class="mx-2 d-flex "
                 fab
                 dark
                 v-if="!submittingPwd"
                 large
                 color="blue lighten-4"
                 @click="()=> {addToRecents(); goToDeviceView()}">
            <v-icon color="black" >
              {{icon}}
            </v-icon>
          </v-btn>
        </div>

        <v-card-subtitle class="text-sm-left ma-1 pa-0">{{ room }}</v-card-subtitle>

      </div>
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
                  @keypress.enter="checkPwd"
                  ref="pwdInput"
                  @blur="() => {this.incorrectMsg = ''; this.color = 'white'; this.value = true}"
    ></v-text-field>
    <v-btn         color="success" v-if="submittingPwd" @click="checkPwd" class="text-sm-button" :disabled="password === ''">Ingresar</v-btn>

  </v-card>
</template>

<script>
import {hashCode} from "../../../utils/Utils";
import DialogModal from "@/components/Elements/DialogModal";

export default {
  name: "DeviceCard",
  data() {
    return {
      dialog: false,
      clicked: false,
      input: this.device,
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
  props: ['room', 'device', 'type', 'hash'],
  inject: ['addToRecent'],
  watch: {
    editPressed(val) {
      if (!val)
        this.submitValue()
    }
  },
  methods: {
    checkPwd() {
      // const hash = this.$store.getters.getDevice(this.device, this.room).hash
      // console.log(hash)
      console.log(hashCode(this.password))
      if (hashCode(this.password) === this.hash) {
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
    },
    deleteDeviceDialog() {
      document.activeElement.blur();
      this.dialog = true;
    },
    async submitValue() {
      await this.$store.dispatch('device/modify', {name: this.device, newName: this.input})
      this.dialog = false;
      this.editingName = false
    },
    async deleteDevice() {
      console.log('borrando')
      await this.$store.dispatch('device/delete', this.device)
      this.dialog = false;
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
      return this.hash
    },
    icon() {
      return this.$store.getters.getIcon(this.type)
    }
  }
}
</script>

<style scoped>
.device-name {
  color: white ;
  max-width: 70%
}
.max-100 {
  max-width: 100%
}
.device-card {
  position: relative;
  max-width: 300px
}
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
  margin-top: 105px;
  margin-right: -10px;
  position: absolute;
  top: 0;
  right: 0;
}

</style>