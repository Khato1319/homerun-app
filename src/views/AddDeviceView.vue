<template>
<div>
  Adding device to {{roomName}} <v-spacer></v-spacer> <CloseButton @onClick="close"></CloseButton>
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
import CloseButton from "@/components/CloseButton";
import slugConverter from "../../utils/Utils";
export default {
  name: "AddDeviceView",
  inject: ['rooms', 'supportedDevices', 'devices'],
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
      converter: slugConverter
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
      this.type = this.supportedDevices.get(this.type);
      this.devices.push({name: this.deviceName, room: this.room, type: this.type, group: this.group});
      this.resetValues();
      this.$router.go(-1);
    }
  },
  computed: {
    valid() {
      return this.deviceName !== "" && this.group !== "" &&
          (!this.checkbox || this.password !== "")
    },
    possibleDevices() {
      return Array.from(this.supportedDevices.keys());
    },
    room() {
      return this.$route.params.room;
    },
    roomName() {
      return this.converter(this.room);
    },
    groupsForRoom() {
      return this.devices.filter(d=>d.room === this.room).map(d => this.converter(d.group));
    }
  }
}
</script>

<style scoped>

</style>