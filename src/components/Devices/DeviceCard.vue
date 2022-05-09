<template>
  <v-card
      elevation="4"
      rounded
      class="pa-2 ma-4 white--text"
      color="primary"
      style="position: relative"
  >
    <DialogModal @setDialog='(val) => this.dialog = val' :dialog="dialog"  @acceptEvent="deleteElement" @cancelEvent="() => this.dialog = false">
      <template v-slot:title>
        Borrado de dispositivo
      </template>
      ¿Está seguro de que quiere borrar el dispositivo {{ converter(device) }}?
    </DialogModal>
    <v-fab-transition>
      <v-btn v-if="editPressed && !editingName" mode="out-in" fab x-small id="delete-button" @click.stop="deleteDeviceDialog">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn v-if="editPressed && !editingName" fab x-small id="edit-button" @click.stop="editElement">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
    <div class="d-flex justify-space-between align-content-center">
      <div class="d-flex flex-column">
        <v-card-title><input ref='inputElem' style="color: white" :disabled="!editPressed || !editingName" type="text" v-model="input"><v-btn class="mx-2"
                                         fab
                                         dark
                                         small
                                         color="blue-grey lighten-4"
        @click="()=> {addToRecents(); goToDeviceView()}"><v-icon dark>
          mdi-cog
        </v-icon></v-btn></v-card-title>
        <v-card-subtitle>{{converter(room)}}</v-card-subtitle>
      </div>

    </div>
    <v-btn
        class="mx-2"
        fab
        dark
        large
        :color="clicked ? 'white' : 'blue-grey lighten-4'" @click="()=>{clicked = !clicked; addToRecents()}"
        elevation="8"

    ><v-icon :color="clicked ? 'blue-grey lighten-4' : 'white'">
      mdi-android
    </v-icon></v-btn>
  </v-card>
</template>

<script>
import {slugToText} from "../../../utils/Utils";
import DialogModal from "@/components/Elements/DialogModal";
export default {
  name: "DeviceCard",
  data() {
    return {
      dialog: false,
      clicked: false,
      input: this.converter(this.device),
      editingName: false
    }
  },
  components: {
    DialogModal
  },
  props: ['room', 'device', 'type'],
  inject: ['supportedDevices', 'addToRecent'],
  methods: {
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
    deleteElement() {
      // todo: borrado de dispositivo
    },
    converter(string) {
      return slugToText(string)
    },
    goToDeviceView() {
      this.$store.commit('selectRoom', this.room);
      this.$router.push({ name: this.type, params: { deviceName: this.device, room: this.room } })
    },
    addToRecents() {
      this.addToRecent(this.device)
    }
  },
  computed: {
    editPressed() {
      return this.$store.state.editTheRoomPressed
    }
  }
}
</script>

<style scoped>
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
  margin-top: 180px;
  margin-right: -10px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>