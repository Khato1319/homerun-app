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
        <div class="primary--text text-sm-start mb-2">
          Agregar habitaciones, rutinas y dispositivos
        </div>

        <v-expansion-panels inset>

          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo agrego una habitación?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Habitaciones</b></li>
                <li>Desplázate hasta la parte inferior y luego toca <v-icon color="primary">mdi-plus-circle</v-icon></li>
                <li>Cuando termines de colocar el nombre, presiona <b>enter</b> en tu teclado</li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo agrego una rutina?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Rutinas</b></li>
                <li>Desplázate hasta la parte inferior y luego toca <v-icon color="primary">mdi-plus-circle</v-icon></li>
                <li>Cuando termines de colocar el nombre, presiona <b>Enter</b> en tu teclado</li>
                <li>Desplázate a la solapa derecha y, luego seleccione un dispositivo que quiera añadir</li>
                <li>Selecciona la acción que quieras que realice el dispositivo</li>
                <li>Cuando termines, toca <b>Agregar</b></li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo agrego un dispositivo?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Habitaciones</b></li>
                <li>Toca la habitacion donde quieras agregar el dispositivo</li>
                <li>Desplázate a la solapa derecha, y luego toca <v-icon color="primary">mdi-plus-circle</v-icon></li>
                <li>Completa la información de tu dispositivo (nombre, tipo, grupo y autenticación)</li>
                <li>Cuando termines toca <b>Agregar</b></li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="primary--text text-sm-start mb-2 mt-8">
          Editar habitaciones, rutinas y dispoitivos
        </div>

        <v-expansion-panels inset>
          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo edito una habitación?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Habitaciones</b></li>
                <li>Desplázate hasta la parte superior y, luego toca <v-icon color="primary">mdi-pencil-box</v-icon></li>
                <li>Toca <v-icon>mdi-pencil-circle</v-icon> en la habitacion que quieras editar</li>
                <li>Cuando termines de modificar el nombre, toca <b>enter</b> en tu teclado</li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo edito una rutina?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Rutinas</b></li>
                <li>Desplázate hasta la parte superior, y luego toca <v-icon color="primary">mdi-pencil-box</v-icon></li>
                <li>Toca <v-icon>mdi-pencil-circle</v-icon> en la rutina que quieras editar</li>
                <li>Cuando termines de modificar el nombre, toca <b>enter</b> en tu teclado</li>

              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>


          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Como edito un dispositivo?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Habitaciones</b></li>
                <li>Toca la habitacion donde quieras editar el dispositivo</li>
                <li>Desplázate a la solapa derecha, y luego toca <v-icon color="primary">mdi-pencil-box</v-icon></li>
                <li>Toca <v-icon>mdi-pencil-circle</v-icon> en el dispositivo que quieras editar</li>
                <li>Cuando termines de modificar el nombre, toca <b>enter</b> en tu teclado</li>

              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="primary--text text-sm-start mb-2 mt-8">
          Eliminar habitaciones, rutinas y dispoitivos
        </div>

        <v-expansion-panels inset>
          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo elimino una habitación?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Habitaciones</b></li>
                <li>Desplázate hasta la parte superior y, luego toca <v-icon color="primary">mdi-pencil-box</v-icon></li>
                <li>Toca <v-icon>mdi-delete-circle</v-icon> en la habitacion que quieras eliminar</li>
                <li>En la confirmacion de la accion, toca <b>Borrar</b></li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo elimino una rutina?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Rutinas</b></li>
                <li>Desplázate hasta la parte superior, y luego toca <v-icon color="primary">mdi-pencil-box</v-icon></li>
                <li>Toca <v-icon>mdi-delete-circle</v-icon> en la rutina que quieras eliminar</li>
                <li>Para confirmar la acción, toca <b>Borrar</b></li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>


          <v-expansion-panel>
            <v-expansion-panel-header>
              ¿Cómo elimino un dispositivo?
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ol class="ordered-list">
                <li>En la parte superior, toca <b>Habitaciones</b></li>
                <li>Toca la habitación donde quieras eliminar el dispositivo</li>
                <li>Desplázate a la solapa derecha, y luego toca <v-icon color="primary">mdi-pencil-box</v-icon></li>
                <li>Toca <v-icon>mdi-delete-circle</v-icon> en el dispositivo que quieras editar</li>
                <li>Para confirmar la acción, toca <b>Borrar</b></li>
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
