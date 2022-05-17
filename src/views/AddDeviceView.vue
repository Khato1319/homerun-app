<template>
  <div>
    <div class="primary--text font-weight-bold">
      Agregando dispositivo a {{roomName}}
    </div>
    <v-spacer/>
    <CloseButton @onClick="close"/>
    <v-form
        ref="form"
        lazy-validation
    >
      <v-text-field
          v-model="deviceName"
          :counter="60"
          :rules="[v => v.length <= 60 && v.length >= 3 || 'El nombre debe tener entre 3 y 60 caracteres',
          v => v.match(/^[A-Za-z0-9_. ]+$/) || 'El nombre debe tener letras, números o _']"
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
          label="Grupo (opcional)"
      ></v-text-field>
      <div class="text-sm-left group-label" >
        Si se ingresa un grupo nuevo, este será creado.
      </div>

      <v-btn x-small v-for="groupp in groupsForRoom" :key="groupp"
      @click="()=> group = groupp" class="group-btn">{{groupp}}</v-btn>

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
          @click="validate"
      >Agregar</v-btn>
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
    toTitleCase(phrase) {
      return phrase
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    },
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
    async validate() {
      const deviceTypeObj = this.$store.getters.getDeviceTypeObj(this.type)
      const payload = {name: this.toTitleCase(this.deviceName), room: this.room, group: this.group, hash: this.password === '' ? null : hashCode(this.password), id: deviceTypeObj.id}
      console.log(payload)
      await this.$store.dispatch('device/create',payload);
      this.resetValues();
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState(['devices', 'rooms']),
    valid() {
        return this.deviceName.length >= 3 && this.deviceName.length <= 60 &&
            this.deviceName.match(/^[A-Za-z0-9_. ]+$/) &&
            // this.group.length >= 3 && this.group.length <= 60 &&
          (!this.checkbox || this.password !== "")
    },
    possibleDevices() {
      return this.$store.state.supportedDevices.map(device => device.name).sort()
    },
    room() {
      return this.$route.params.room;
    },
    roomName() {
      return this.room;
    },
    groupsForRoom() {
      let devices=this.$store.getters['device/getDevices']
      if (devices.length === 0)
        return []
      const devicesArray = devices.filter(d => d.room)
      const set = new Set(devicesArray.filter(d=> d.room.name === this.roomName).map(d => d.meta.group))
      set.delete("")
      return set
    }
  }
}
</script>

<style scoped>
.group-btn {
  margin: 2px
}
.group-label {
  font-size: 12px
}
</style>