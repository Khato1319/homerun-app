<template>
  <v-container>
    <v-row >
      <v-col>
        <div
            class=" text-uppercase text-md-center primary--text"
        >Ayuda</div>
      </v-col>
      <CloseButton @onClick="goHome"/>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-expansion-panels inset>
          <v-expansion-panel>
            <v-expansion-panel-header>Como agregar una habitacion</v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>Ir al menu "Habitaciones"</li>
                <li>Hacer click en el boton "+" que se encuentra debajo a la derecha</li>
                <li>Elegir el nombre que desee para su nueva habitacion</li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header >Como editar una habitacion </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>Ir al menu "Habitaciones"</li>
                <li>Hacer click en el boton "editar" que se encuentra arriba a la izquierda</li>
                <li>Utilice el lapiz para cambiar el nombre de la habitacion o el tacho de basura para eliminar la misma</li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import CloseButton from "@/components/ViewButtons/CloseButton";
export default {
  name: "HelpView",
  components: {CloseButton},
  methods: {
    goHome(){
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
.ordered-list{
  font-size: 20px;
  text-align: start;
}
</style>
