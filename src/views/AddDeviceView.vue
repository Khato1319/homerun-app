<template>
<div>
  Agregando dispositivo a {{roomName}} <v-spacer></v-spacer>
  <CloseButton @onClick="close"></CloseButton>
  <v-form
      ref="form"
      lazy-validation
  >
    <v-text-field
        v-model="deviceName"
        :counter="60"
        :rules="[v => v.length <= 60 && v.length >= 3 || 'El nombre debe tener entre 3 y 60 caracteres']"
        label="Nombre"
        required
    ></v-text-field>

    <v-select
        v-model="type"
        :items="possibleDevices"
        :rules="[v => !!v || 'El item es obligatorio']"
        label="Tipo de dispositivo"
        required
    ></v-select>

    <v-text-field
        v-model="group"
        :counter="60"
        label="Grupo"
        :rules="[v => v.length <= 60 && v.length >= 3 || 'El nombre debe tener entre 3 y 60 caracteres']"
        required
    ></v-text-field>
    <div class="text-sm-left" style="font-size: 12px">
      Si se ingresa un grupo nuevo, este será creado.
    </div>

    <v-btn x-small v-for="groupp in groupsForRoom" :key="groupp"
    @click="()=> group = groupp" style="margin: 2px">{{groupp}}</v-btn>

    <v-checkbox
        v-model="checkbox"
        label="Requerir autenticación"
        required
    ></v-checkbox>
    <v-text-field v-if="checkbox"
        v-model="password"
        label="Contraseña"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  @blur="() => this.value = false"
        required
    ></v-text-field>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
    >
      Agregar
    </v-btn>
  </v-form>
</div>
</template>

<script>
import CloseButton from "@/components/ViewButtons/CloseButton";
import {hashCode} from "../../utils/Utils";
import {mapState} from "vuex";
export default {
  name: "AddDeviceView",
  components: {
    CloseButton
  },
  data() {
    return {
      password: "",
      checkbox: false,
      group: "",
      type: "",
      deviceName: "",
      value: true

    }
  },
  methods: {
    resetValues() {
      this.password =  "";
      this.checkbox = false;
      this.group = "";
      this.deviceName =  "";
    },
    close() {
      this.resetValues();
      this.$router.go(-1);
    },
    validate() {
      const deviceTypeObj = this.$store.getters.getDeviceTypeObj(this.type)
      const payload = {name: this.deviceName, room: this.room, group: this.group, hash: this.password === '' ? null : hashCode(this.password), id: deviceTypeObj.id}
      console.log(payload)
      this.$store.dispatch('device/create',payload);
      this.resetValues();
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState(['devices', 'rooms']),
    valid() {
        return this.deviceName.length >= 3 && this.deviceName.length <= 60 &&
            this.group.length >= 3 && this.group.length <= 60 &&
          (!this.checkbox || this.password !== "")
    },
    possibleDevices() {
      return this.$store.state.supportedDevices.map(device => device.name)
    },
    room() {
      return this.$route.params.room;
    },
    roomName() {
      return this.room;
    },
    groupsForRoom() {
      if (this.$store.getters['device/getDevices'].length === 0)
        return []
      return new Set(this.$store.getters['device/getDevices'].filter(d=> d.room.name === this.roomName).map(d => d.meta.group))
    }
  }
}
</script>

<style scoped>

</style>