<template>
<div>
  Agregando dispositivo a {{roomName}} <v-spacer></v-spacer>
  <CloseButton @onClick="close"></CloseButton>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="deviceName"
        :counter="10"
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
        :counter="10"
        label="Grupo"
        required
        messages="Si se ingresa un grupo nuevo, este será creado"
    ></v-text-field>

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
import {hashCode, slugToText} from "../../utils/Utils";
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
      converter: slugToText,
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
      return this.deviceName !== "" && this.group !== "" &&
          (!this.checkbox || this.password !== "")
    },
    possibleDevices() {
      return this.$store.state.supportedDevices.map(device => device.name)
    },
    room() {
      return this.$route.params.room;
    },
    roomName() {
      return this.converter(this.room);
    },
    groupsForRoom() {
      return new Set(this.$store.state.devices.filter(d=>d.room === this.room).map(d => this.converter(d.group)))
    }
  }
}
</script>

<style scoped>

</style>