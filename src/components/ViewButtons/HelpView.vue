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
    <v-row justify="center" class="overflow-container">
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="primary--text text-sm-start mb-2 mt-2">
                Agregar habitaciones, rutinas y dispositivos
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
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
            </v-expansion-panel-content>

          </v-expansion-panel>



          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="primary--text text-sm-start mb-2 mt-2">
                Editar habitaciones, rutinas y dispoitivos
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
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
                      <li>Desplázate hasta la parte superior y, luego toca <HelpEditButton></HelpEditButton></li>
                      <li>Toca <HelpEditNameButton></HelpEditNameButton> en la habitacion que quieras editar</li>
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
                      <li>Desplázate hasta la parte superior, y luego toca <HelpEditButton></HelpEditButton></li>
                      <li>Toca <HelpEditNameButton></HelpEditNameButton> en la rutina que quieras editar</li>
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
                      <li>Desplázate a la solapa derecha, y luego toca <HelpEditButton></HelpEditButton></li>
                      <li>Toca  <HelpEditNameButton></HelpEditNameButton> en el dispositivo que quieras editar</li>
                      <li>Cuando termines de modificar el nombre, toca <b>enter</b> en tu teclado</li>

                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>



          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="primary--text text-sm-start mb-2 mt-2">
                Eliminar habitaciones, rutinas y dispoitivos
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
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
                      <li>Desplázate hasta la parte superior y, luego toca <HelpEditButton></HelpEditButton></li>
                      <li>Toca <HelpDeleteButton></HelpDeleteButton> en la habitacion que quieras eliminar</li>
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
                      <li>Desplázate hasta la parte superior, y luego toca <HelpEditButton></HelpEditButton></li>
                      <li>Toca <HelpDeleteButton></HelpDeleteButton> en la rutina que quieras eliminar</li>
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
                      <li>Desplázate a la solapa derecha, y luego toca <HelpEditButton></HelpEditButton></li>
                      <li>Toca <HelpDeleteButton></HelpDeleteButton> en el dispositivo que quieras eliminar</li>
                      <li>Para confirmar la acción, toca <b>Borrar</b></li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import CloseButton from "@/components/ViewButtons/CloseButton";
import HelpEditButton from "@/components/Devices/Buttons/HelpEditButton";
import HelpEditNameButton from "@/components/Devices/Buttons/HelpEditNameButton";
import HelpDeleteButton from "@/components/Devices/Buttons/HelpDeleteButton";
export default {
  name: "HelpView",
  components: {HelpEditNameButton, HelpEditButton, CloseButton, HelpDeleteButton},
  methods: {
    goHome(){
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
.overflow-container {
  overflow-y: auto;
  height: 74vh
}
.ordered-list{
  font-size: 20px;
  text-align: start;
}
</style>
