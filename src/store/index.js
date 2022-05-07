import Vue from 'vue';
import Vuex from 'vuex';
import slugConverter from "../../utils/Utils";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        rooms: ['bedroom', 'living', 'uno', 'bathroom', 'gameroom', 'office', 'kitchen'],
        routines: ['buen-dia', 'a-dormir'],
        selectedRoom: "",
        selectedRoutine: "",
        devices: [{
            name: "luz-1",
            room: "bedroom",
            type: "light",
            group: "grupo-1"
        }, {
            name: "luz-2",
            room: "bedroom",
            type: "light",
            group: "grupo-2"
        },
            {
                name: "aspiradora",
                room: "living",
                type: "vacuum",
                group: "grupo-1"
            }]
    },
    getters: {
        groupsNoSlug: (state) => (room) => {
            return state.devices.filter(d=>d.room === room).map(d => slugConverter(d.group));
        },
        deviceExists: (state) => (type, name) => {
            console.log(type);
            console.log(name);
            return state.devices.find(d => d.type === type && d.name === name);
        },
        selectedRoom: (state) => state.selectedRoom,
        selectedRoutine: (state) => state.selectedRoutine
    },

    mutations: {
        addRoom (state, room) {
            state.rooms.push(room);
        },
        addDevice (state, device) {
            state.devices.push(device);
        },
        selectRoom(state, room) {
            state.selectedRoom = room;
        },
        selectRoutine(state, routine) {
            state.selectedRoutine = routine;
        },
        deleteRoom(state, room) {
            state.rooms = state.rooms.filter(el => el !== room)
        },
        deleteRoutine(state, routine) {
            state.routines = state.routines.filter(el => el !== routine)
        }
    },
    actions: {

    }

});
