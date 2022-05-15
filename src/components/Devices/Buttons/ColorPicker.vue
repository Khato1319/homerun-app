<template>
  <v-card class="e4">
    <v-responsive
        :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
        height="50px"
    ></v-responsive>

    <v-card-text>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12">
            <v-slider
                v-model="red"
                :max="255"
                label="R"
                class="align-center"
                @change="changeHandler"
            >
              <template v-slot:append>
                <!--                <v-text-field-->
                <!--                    v-model="red"-->
                <!--                    class="mt-0 pt-0"-->
                <!--                    type="number"-->
                <!--                    style="width: 45px"-->
                <!--                ></v-text-field>-->
              </template>
            </v-slider>
          </v-col>

          <v-col cols="12">
            <v-slider
                v-model="green"
                :max="255"
                label="G"
                class="align-center"
                @change="changeHandler"
            >
              <template v-slot:append>
                <!--                <v-text-field-->
                <!--                    v-model="green"-->
                <!--                    class="mt-0 pt-0"-->
                <!--                    type="number"-->
                <!--                    style="width: 45px"-->
                <!--                ></v-text-field>-->
              </template>
            </v-slider>
          </v-col>

          <v-col cols="12">
            <v-slider
                v-model="blue"
                :max="255"
                label="B"
                class="align-center"
                @change="changeHandler"
            >
              <template v-slot:append>
                <!--                <v-text-field-->
                <!--                    v-model="blue"-->
                <!--                    class="mt-0 pt-0"-->
                <!--                    type="number"-->
                <!--                    style="width: 45px"-->
                <!--                ></v-text-field>-->
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
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
    }
  },
  mounted() {
    const state = this.componentState

    this.red = state.r
    this.green = state.g
    this.blue = state.b
  },
  props: ['apiId', 'name', 'state', 'deviceView', 'statusParam'],
  methods: {
    changeHandler() {
      if (this.deviceView) {
        const payload = {
          name: this.name,
          param: this.rgbToHex(this.red, this.green, this.blue),
          action: this.apiId
        }
        this.$store.dispatch('device/applyAction', payload)
      }
    },
    componentToHex(c) {
      let hex = c.toString(16);
      console.log(c)
      return hex.length === 1 ? "0" + hex : hex;
    },
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },

    rgbToHex(r, g, b) {
      return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
    },
    getActionValue() {
      const rgb = this.rgbToHex(this.red, this.green, this.blue)
      return {
        displayValue: '#' + rgb,
        value: rgb,
        actionName: this.apiId
      }
    },
  },
  computed: {
    componentState() {
      return this.hexToRgb(this.state[this.statusParam])
      // return this.$store.getters["device/getDevice"](this.name).state[this.statusParam] === "on"
    }
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