import {DeviceApi} from "@/api/device";

export default{
    namespaced: true,
    state: {
        devices: []
    },
    getters: {
      getDevices: (state) => {
          return state.devices
      },
    getDevice: (state) => (name) => {
      return state.devices.find(r => r.name === name)
    },
    },
    actions: {
        async create({dispatch}, payload) {
            const deviceObj = {
                type: {
                    id: payload.id
                },
                name: payload.name,
                meta: {
                    room: payload.room,
                    group: payload.group,
                    hash: payload.hash
                }
            }
            const result =  await DeviceApi.add(deviceObj)
            await dispatch("getAll")
            // setTimeout(async ()=> await dispatch("getAll"), 300)
            return result
        },
        async modify({dispatch, getters}, payload) {
            const deviceObj = getters.getDevice(payload.name)
            deviceObj.name = payload.newName

            const result =  await DeviceApi.modify(deviceObj)
            await dispatch("getAll")
            return result
        },
        async delete({ dispatch, getters }, roomName) {
            const id = getters.getDevice(roomName).id
            await DeviceApi.delete(id);
            await dispatch("getAll");
        },
        async applyAction({ dispatch, getters}, payload) {
            const id = getters.getDevice(payload.name).id
            await DeviceApi.action(id, payload.action, {param: payload.param});
            await dispatch("getAll");
        },
        async getAll({commit}) {
            const result =  await DeviceApi.getAll()
            console.log("dispositivos: " + result)
            commit("update", result)
        }
    },
    mutations: {
        update(state, devices) {
            console.log('updating')
            state.devices = devices
        }
    }
}