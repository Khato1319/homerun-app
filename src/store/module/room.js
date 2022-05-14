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
            const result =  await RoomApi.add(roomName)
            console.log('result: ' + result)
            await dispatch("getAll")
            // setTimeout(async ()=> await dispatch("getAll"), 300)
            return result
        },
        async modify({dispatch, getters}, payLoad) {
            const roomObj = getters.getRoom(payLoad.name)
            roomObj.name = payLoad.newName
            const result =  await RoomApi.modify(roomObj)
            await dispatch("getAll")
            return result
        },
        async delete({ dispatch, getters }, roomName) {
            const id = getters.getRoom(roomName).id
            console.log(id)
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