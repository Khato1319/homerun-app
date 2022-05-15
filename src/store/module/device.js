import {DeviceApi} from "@/api/device";
import {RoomApi} from "@/api/room";

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
        getDeviceById: (state) => (id) => {
            return state.devices.find(r => r.id === id)
        }
    },
    actions: {
        async create({dispatch, rootGetters}, payload) {
            const deviceObj = {
                type: {
                    id: payload.id
                },
                name: payload.name,
                meta: {
                    group: payload.group,
                    hash: payload.hash
                }
            }
            const result =  await DeviceApi.add(deviceObj)

            await dispatch("getAll")

            if (rootGetters['device/getDevice'](payload.name).type.name === 'vacuum') {
                const roomId = rootGetters['room/getRoom'](payload.room).id
                await dispatch('applyAction', {name: payload.name, action: 'setLocation', param: roomId})
            }

            await dispatch('bindToRoom', {deviceName: payload.name, deviceRoom: payload.room})
            // setTimeout(async ()=> await dispatch("getAll"), 300)
            await dispatch("getAll")

            return result
        },
        async bindToRoom({rootGetters}, payload) {
            const deviceId = rootGetters['device/getDevice'](payload.deviceName).id
            const roomId = rootGetters['room/getRoom'](payload.deviceRoom).id
            await RoomApi.bindDeviceToRoom(deviceId, roomId)
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
            await DeviceApi.action(id, payload.action, payload.param);
            await dispatch("getAll");
        },
        async getAll({commit}) {
            const result =  await DeviceApi.getAll()
            commit("update", result)
        }
    },
    mutations: {
        update(state, devices) {
            state.devices = devices
        }
    }
}