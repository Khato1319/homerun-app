import {RoutineApi} from "@/api/routine";
import {RoomApi} from "@/api/room";

export default{
    namespaced: true,
    state: {
        routines: []
    },
    getters: {
        getRoutines: (state) => {
            return state.routines
        },
        getRoutine: (state) => (name) => {
            return state.routines.find(r => r.name === name)
        }
    },
    actions: {
        async create({dispatch}, payload) {

            const firstAction = {
                device: {
                    id: payload.deviceId
                },
                actionName: payload.actionName,
                params: [payload.param],
                meta: payload.meta
            }
            const routineObj = {name: payload.routineName, actions: [firstAction], meta: {}}
            const result =  await RoutineApi.add(routineObj)
            console.log('result: ' + result)
            await dispatch("getAll")
            return result
        },
        async delete({ dispatch, state }, name) {
            const id = state.routines.find(r => r.name === name).id
            console.log(id)
            await RoutineApi.delete(id);
            await dispatch("getAll");
        },
        async modifyName({dispatch, getters}, payLoad) {
            const routineObj = getters.getRoutine(payLoad.name)
            routineObj.name = payLoad.newName
            const result =  await RoomApi.modify(routineObj)
            await dispatch("getAll")
            return result
        },
        async addAction({dispatch, getters}, payload) {
            const routineObj = getters.getRoutine(payload.routineName)
            const newAction = {
                device: {
                    id: payload.deviceId
                },
                actionName: payload.actionName,
                params: [payload.param],
                meta: payload.meta
            }
            routineObj.actions.push(newAction)
            // const routineObj = {name: payload.routineName, actions: [firstAction], meta: {}}
            const result =  await RoomApi.modify(routineObj)
            await dispatch("getAll")
            return result
        },
        async getAll({commit}) {
            const result =  await RoutineApi.getAll()
            console.log(result)
            commit("update", result)
        }
    },
    mutations: {
        update(state, routines) {
            console.log('updating')
            state.routines = routines
        }
    }
}