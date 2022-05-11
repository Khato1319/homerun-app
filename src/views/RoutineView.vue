<template>
  <div>
    <v-scroll-x-transition>
      <AddButton v-if=!editing @onClick="addDevice"></AddButton>
    </v-scroll-x-transition>
    <EditButton class='edit-button' toggler="toggleEditActionsPressed" edit-button-getter="editActionsPressed"></EditButton>
    <CloseButton @onClick="close"/>

      <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >Rutina {{
          this.converter(routine)}}</div>

      <v-card v-for="(action, idx) in actions" :key="action.name">
        <v-card-text>{{converter(action.device)}} de {{converter(action.room)}} - {{converter(action.action)}}: {{converter(action.value[1])}} </v-card-text>
        <v-fab-transition>
          <v-btn v-if="editing" mode="out-in" fab x-small id="delete-button"
                @click="()=>deleteActionModal(idx)" >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card>

    <DialogModal @setDialog='(val) => this.dialog = val' :dialog="dialog" @acceptEvent="deleteAction"
                 @cancelEvent="() => this.dialog = false">

      <template v-slot:title>
        Borrado de acción
      </template>
      ¿Está seguro de que quiere borrar la acción de {{ selectedAction && converter(selectedAction.action) }} sobre {{selectedAction && converter(selectedAction.device)}}?
    </DialogModal>

  </div>

</template>

<script>
// todo: agregar la posibiidad de editar rutinas
import AddButton from "@/components/ViewButtons/AddButton";
import CloseButton from "@/components/ViewButtons/CloseButton";
import EditButton from "@/components/ViewButtons/EditButton";
import {slugToText} from "../../utils/Utils";
import {mapGetters, mapState} from "vuex";
import DialogModal from "@/components/Elements/DialogModal";

export default {
  name: "RoutineView",
  components: {
    AddButton,
    CloseButton,
    EditButton,
    DialogModal
  },
  data() {
    return {
      routine: this.$route.params.routine,
      dialog: false,
      actionIdx: undefined,
      selectedAction: undefined
    }
  },
  mounted() {
    this.$store.commit('setEditActionsPressed', false)
    this.$store.commit('setEditRoutinePressed', false)
    this.$store.commit('setEditRoomPressed', false)
    this.$store.commit('setEditTheRoomPressed', false)
  },
  methods: {
    deleteActionModal(idx) {
      document.activeElement.blur();
      console.log(this.actions)
      this.selectedAction = this.actions[idx]
      this.actionIdx = idx
      this.dialog = true
    },
    deleteAction() {
      this.$store.commit('deleteActionFromRoutine', {routine: this.routine, idx: this.actionIdx})
      this.dialog = false
    },
    converter(string) {
      return slugToText(string)
    },
    ...mapGetters(['selectedRoutine']),
    addDevice() {
      this.$router.push({ name: 'addRoutine', params: { routine:  this.routine} })
    },
    close() {
      this.$store.commit('selectRoutine',"");
      console.log("volviendo a home")
      this.$router.push({ path: '/' })
    },
  },
  computed: {
    ...mapState(['devices']),
    actions() {
      return this.$store.getters.getRoutine(this.routine).actions
    },
    editing() {
      return this.$store.state.editActionsPressed
    }
  }
}
</script>

<style scoped>
.edit-button {
  top: 25px;
  right: 60px;
}

#delete-button {
  line-height: 12px;
  width: 25px;
  height: 25px;
  font-size: 8pt;
  margin-top: -10px;
  margin-right: -10px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>