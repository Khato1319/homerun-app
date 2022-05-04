<template>
<div>
  Adding device to {{$route.params.theRoom}} <v-spacer></v-spacer> <CloseButton @onClick="close"></CloseButton>
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
        v-model="room"
        :items="rooms"
        :rules="[v => !!v || 'El item es obligatorio']"
        label="Habitación"
        required
    ></v-select>

    <v-text-field
        v-model="group"
        :counter="10"
        label="Grupo"
        required
        messages="Si se ingresa un grupo nuevo, este será creado"
    ></v-text-field>

    <v-btn x-small v-for="groupp in ['Grupo 1', 'Grupo 2', 'Grupo 3']" :key="groupp"
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
export default {
  name: "AddDeviceView",
  inject: ['rooms'],
  components: {
    CloseButton
  },
  data() {
    return {
      password: "",
      checkbox: false,
      group: "",
      room: this.$route.params.room,
      deviceName: ""
    }
  },
  methods: {
    close() {
      this.password =  "";
      this.checkbox = false;
      this.group = "";
      this.room =  "";
      this.deviceName =  "";
      this.$router.go(-1);
    }
  },
  computed: {
    valid() {
      return this.deviceName !== "" && this.group !== "" &&
          (!this.checkbox || this.password !== "")
    }
  }
}
</script>

<style scoped>

</style>