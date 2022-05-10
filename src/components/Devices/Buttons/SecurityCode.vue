<template>
  <v-form
    lazy-validation
  ><v-container>
      <v-row>
        <v-col cols="3">
          <v-text-field
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

        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {

  data (){
    return {
      hide: true,
      code: "",
      codeRules: [
        v => !!v || 'Code is required',
        v => (v && v.length <= 4) || 'Code must be less than 4 characters',
        v => (/^[1-9]/.test(v) || 'Code must be a number')
      ]
    }
  }
}

</script>

<style>

</style>