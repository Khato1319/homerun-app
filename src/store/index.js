import Vue from 'vue';
import Vuex from 'vuex';
import {textToSlug}  from "../../utils/Utils";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        rooms: ['bedroom', 'living', 'uno', 'bathroom', 'gameroom', 'office', 'kitchen'],
        routines: ['buen-dia', 'a-dormir'],
        selectedRoom: "",
        selectedRoutine: "",
        editRoomPressed: false,
        editTheRoomPressed: false,
        editRoutinePressed: false,
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
        getRooms: (state) => {
          return state.rooms
        },
        getRoutines: (state) => {
            return state.routines
        },
        groupsNoSlug: (state) => (room) => {
            return state.devices.filter(d=>d.room === room).map(d => textToSlug(d.group));
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
        toggleEditRoomPressed(state) {
            state.editRoomPressed = !state.editRoomPressed
        },
        setEditRoomPressed(state, value) {
            state.editRoomPressed = value
        },
        toggleEditRoutinePressed(state) {
            state.editRoutinePressed = !state.editRoutinePressed
        },
        setEditRoutinePressed(state, value) {
            state.editRoutinePressed = value
        },
        toggleEditTheRoomPressed(state) {
            state.editTheRoomPressed = !state.editTheRoomPressed
        },
        setEditTheRoomPressed(state, value) {
            state.editTheRoomPressed = value
        },
        addRoom (state, room) {
            state.rooms.push(textToSlug(room));
        },
        addDevice (state, device) {
            state.devices.push(textToSlug(device));
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
        },
        editRoomName(state, payLoad) {
            const idx = state.rooms.findIndex(e => e === textToSlug(payLoad.name));
            Vue.set(state.rooms, idx, textToSlug(payLoad.newName))
        },
        editRoutineName(state, payLoad) {
            const idx = state.routines.findIndex(e => e === textToSlug(payLoad.name));
            Vue.set(state.routines, idx, textToSlug(payLoad.newName))
        }
    },
    actions: {

    }

});
