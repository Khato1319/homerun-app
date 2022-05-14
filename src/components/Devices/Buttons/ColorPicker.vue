<template>
  <v-card class="e4" >
    <v-responsive
        :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
        height="50px"
    ></v-responsive>

    <v-card-text>
      <v-container fluid >
        <v-row no-gutters>
          <v-col cols="12">
            <v-slider
                v-model="red"
                :max="255"
                label="R"
                class="align-center"
            >
              <template v-slot:append>
                <v-text-field
                    v-model="red"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 45px"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>

          <v-col cols="12">
            <v-slider
                v-model="green"
                :max="255"
                label="G"
                class="align-center"
            >
              <template v-slot:append>
                <v-text-field
                    v-model="green"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 45px"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>

          <v-col cols="12">
            <v-slider
                v-model="blue"
                :max="255"
                label="B"
                class="align-center"
            >
              <template v-slot:append>
                <v-text-field
                    v-model="blue"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 45px"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ColorPicker",
  data () {
    return {
      red: 64,
      green: 128,
      blue: 0,
    }
  },
  props: ['apiId'],
  methods: {
    getActionValue() {
      const rgb = `${this.red.toString(16)}${this.blue.toString(16)}${this.green.toString(16)}`
      return {
        displayValue: rgb,
        value: rgb,
        actionName: this.apiId
      }
    },
  }
}
</script>

<style scoped>
.e4 {
  width: 200px;
  height: 300px;
  margin: auto;
}
</style>