import {RoutineApi} from "@/api/routine";

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
        async create({dispatch, rootGetters}, payload) {

            const firstAction = {
                device: {
                    id: rootGetters['device/getDevice'](payload.deviceName).id
                },
                actionName: payload.actionName,
                params: payload.param ? [payload.param] : [],
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
            const result =  await RoutineApi.modify(routineObj)
            await dispatch("getAll")
            return result
        },
        async addAction({dispatch, getters, rootGetters}, payload) {
            const routineObj = getters.getRoutine(payload.routineName)
            const newAction = {
                device: {
                    id: rootGetters["device/getDevice"](payload.deviceName).id
                },
                actionName: payload.actionName,
                params:  payload.param ? [payload.param] : [],
                meta: payload.meta
            }

            routineObj.actions.push(newAction)

            let putObject = {
                name: routineObj.name,
                actions: routineObj.actions.map(a => (
                    {
                        device: { id: a.device.id},
                        actionName: a.actionName,
                        params: a.params,
                        meta: a.meta
                })),
            }
            // const routineObj = {name: payload.routineName, actions: [firstAction], meta: {}}
            const result =  await RoutineApi.modify(putObject, routineObj.id)
            await dispatch("getAll")
            return result
        },
        async removeAction({dispatch, getters}, payload) {
            const routineObj = getters.getRoutine(payload.routineName)

            routineObj.actions.splice(payload.index, 1)

            let putObject = {
                name: routineObj.name,
                actions: routineObj.actions.map(a => (
                    {
                        device: { id: a.device.id},
                        actionName: a.actionName,
                        params: a.params,
                        meta: a.meta
                    })),
            }
            // const routineObj = {name: payload.routineName, actions: [firstAction], meta: {}}
            const result =  await RoutineApi.modify(putObject, routineObj.id)
            await dispatch("getAll")
            return result
        },
        async executeRoutine({getters}, routineName) {
            const routineId = getters.getRoutine(routineName).id
            await RoutineApi.execute(routineId)
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