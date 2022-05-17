<template>
  <div>
    <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >
      <span class="font-weight-bold">Rutina </span> "{{routine}}"
    </div>

    <AddButton v-if=!editing @onClick="addDevice"/>
    <EditButton class='edit-button' toggler="toggleEditActionsPressed" edit-button-getter="editActionsPressed"/>
    <CloseButton @onClick="close"/>

    <div class="overflow-container py-3">
      <v-card class="mx-4" v-for="(action, idx) in actions" :key="action.meta.name + action.device.id">
        <v-card-text >
          <div class="d-flex justify-center align-center">
            {{actionDeviceString(action.device.id)}} - {{action.meta.name}}<span v-if="action.meta.value">: &#8205;</span>
            <div class="color-circle" v-if="action.meta.value && action.meta.value.match('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')"
                 :style="{ backgroundColor: action.meta.value }">
              {{action.meta.display}}
            </div>
            <span v-else-if="action.meta.value">{{action.meta.value}}</span>
          </div>

        </v-card-text>
        <v-fab-transition>
          <v-btn v-if="editing" mode="out-in" fab x-small id="delete-button"
                 @click="()=>deleteActionModal(idx)" >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card>
      <v-btn
          color="success"
          class="ma-4"
          @click="execute"
      >
        Ejecutar
      </v-btn>

    </div>

    <v-snackbar
        :timeout="3000"
        :value="showSnackBar"
        class="snack-bar"
        absolute
        color="primary"
    >
      Se ha ejecutado la rutina correctamente.
    </v-snackbar>

    <DialogModal @setDialog='(val) => this.dialog = val' :dialog="dialog" @acceptEvent="deleteAction"
                 @cancelEvent="() => this.dialog = false">

      <template v-slot:title>
        Borrado de acción
      </template>
      ¿Está seguro de que quiere borrar la acción de "{{ selectedAction && selectedAction.meta.name }}"
      sobre "{{selectedAction && this.$store.getters['device/getDeviceById'](selectedAction.device.id).name}}"?
      <div v-if="actions.length === 1">La rutina vacía se eliminará.</div>
    </DialogModal>

  </div>

</template>

<script>
import AddButton from "@/components/ViewButtons/AddButton";
import CloseButton from "@/components/ViewButtons/CloseButton";
import EditButton from "@/components/ViewButtons/EditButton";
import {mapGetters} from "vuex";
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
      selectedAction: undefined,
      showSnackBar: false
    }
  },
  async beforeMount() {
    await this.$store.dispatch('device/getAll')
    await this.$store.dispatch('routine/getAll')
    await this.$store.dispatch('room/getAll')
  },
  mounted() {
    this.$store.commit('setEditActionsPressed', false)
    this.$store.commit('setEditRoutinePressed', false)
    this.$store.commit('setEditRoomPressed', false)
    this.$store.commit('setEditTheRoomPressed', false)
  },
  methods: {
    async execute() {
        await this.$store.dispatch('routine/executeRoutine', this.routine)
        this.showSnackBar = true;
        setTimeout(() => this.showSnackBar = false, 5000)
    },
    actionDeviceString(id) {
      const device = this.$store.getters['device/getDeviceById'](id)
       return `${device.name} de ${device.room.name}`
    },
    deleteActionModal(idx) {
      document.activeElement.blur();
      console.log(this.actions)
      this.selectedAction = this.actions[idx]
      this.actionIdx = idx
      this.dialog = true
    },
    deleteAction() {
      const lastAction = this.actions.length === 1
      this.$store.dispatch('routine/removeAction', {routineName: this.routine, index: this.actionIdx})
      if (lastAction)
        this.$router.go(-1)
      this.dialog = false
    },
    ...mapGetters(['selectedRoutine']),
    addDevice() {
      this.$router.push({ name: 'addRoutine', params: { routine:  this.routine} })
    },
    close() {
      this.$store.commit('selectRoutine',"");
      this.$router.push({ path: '/' })
    },
  },
  computed: {
    actions() {
      return this.$store.getters['routine/getRoutine'](this.routine).actions
    },
    editing() {
      return this.$store.state.editActionsPressed
    }
  }
}
</script>

<style scoped>
.overflow-container {
  overflow-y: scroll;
  height: 74vh
}

.edit-button {
  top: 25px;
  right: 60px;
}

.snack-bar {
  top: 0;
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

.color-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: inline-block;
}
</style>