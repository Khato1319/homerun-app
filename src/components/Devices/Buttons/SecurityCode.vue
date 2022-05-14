<template>
  <v-form
    lazy-validation
    class="pa-4"
  ><v-text-field
      label="Cambiar PIN de alarma"
      :rules="codeRules"
      :counter="4"
      v-model="code"
      prepend-icon="mdi-lock"
      :append-icon="hide ? 'mdi-eye-off' : 'mdi-eye'"
      outlined
      :type="hide ? 'password' : 'text'"
      @click:append="hide = !hide"
  >
  </v-text-field>
    <v-btn v-if="deviceView" color="success" @click="()=>{}" class="text-sm-button" :disabled="isNaN(code) || code.length !== 4">Cambiar PIN</v-btn>
  </v-form>
</template>

<script>
export default {
props: ['deviceView'],
  data (){
    return {
      hide: true,
      code: "",
      codeRules: [
        v => !!v || 'El PIN es obligatorio',
        v => (v && v.length <= 4 ) || 'El PIN debe tener 4 caracteres',
        v => (!isNaN(v)|| 'El PIN debe ser un número')
      ]
    }
  },
  methods: {
    getActionValue() {
      return{
        actionName: this.apiId,
        value: this.code
      }
    }
  }
}

</script>

<style>

</style>