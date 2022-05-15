import {RoomApi} from "@/api/room";

export default{
    namespaced: true,
    state: {
        rooms: []
    },
    getters: {
      getRooms: (state) => {
          return state.rooms
      },
        getRoom: (state) => (name) => {
          return state.rooms.find(r => r.name === name)
        }
    },
    actions: {
        async create({dispatch}, roomName) {

            const toTitleCase = (phrase)=> {
                return phrase
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }

            const result =  await RoomApi.add(toTitleCase(roomName))
            console.log('result: ' + result)
            await dispatch("getAll")
            // setTimeout(async ()=> await dispatch("getAll"), 300)
            return result
        },
        async modify({dispatch, getters}, payLoad) {
            const toTitleCase = (phrase)=> {
                return phrase
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
            const roomObj = getters.getRoom(payLoad.name)
            roomObj.name = toTitleCase(payLoad.newName)
            const result =  await RoomApi.modify(roomObj)
            await dispatch("getAll")
            return result
        },
        async delete({ dispatch, getters, rootGetters }, roomName) {
            const id = getters.getRoom(roomName).id

            for (const device of rootGetters['device/getDevices']) {
                if (device.room.id === id) {
                    await dispatch('device/delete', device.name, {root: true})
                }
            }

            await RoomApi.delete(id);
            await dispatch("getAll");
        },
        async getAll({commit}) {
            const result =  await RoomApi.getAll()
            console.log(result)
            commit("update", result)
        }
    },
    mutations: {
        update(state, rooms) {
            console.log('updating')
            state.rooms = rooms
        }
    }
}