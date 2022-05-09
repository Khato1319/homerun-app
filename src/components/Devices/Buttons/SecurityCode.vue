<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-text-field
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

  props: ['password'],
  data (){
    return {
      hide: true,
      correctPassword: '1111',
    }
  }
}

</script>

<style>

</style>