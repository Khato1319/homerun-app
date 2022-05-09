import Vue from 'vue';
import Vuex from 'vuex';
import {textToSlug} from "../../utils/Utils";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        rooms: ['bedroom', 'living', 'uno', 'bathroom', 'gameroom', 'office', 'kitchen'],
        routines: [{
            routine: 'buen-dia',
            actions: [{device: 'luz-1', room: 'bedroom', action: 'apagar'}, {
                device: 'luz-1',
                room: 'bedroom',
                action: 'apagar'
            }]
        }, {
            routine: 'a-dormir',
            actions: [{device: 'luz-1', room: 'bedroom', action: 'apagar'}, {
                device: 'luz-1',
                room: 'bedroom',
                action: 'apagar'
            }]
        }],
        selectedRoom: "",
        selectedRoutine: "",
        editRoomPressed: false,
        editTheRoomPressed: false,
        editRoutinePressed: false,
        supportedDevices: [{
            type: 'light',
            name: 'Lámpara',
            actions: [{slug: 'turn-on', name: 'encender'}, {slug: 'turn-off', name: 'apagar'}]
        },
            {
                type: 'vacuum',
                name: 'Lámpara',
                actions: [{slug: 'turn-on', name: 'encender'}, {slug: 'turn-off', name: 'apagar'}]
            },
            {
                type: 'light',
                name: 'Aspiradora',
                actions: [{slug: 'turn-on', name: 'encender'}, {slug: 'turn-off', name: 'apagar'}]
            },
            {
                type: 'alarm',
                name: 'Alarma',
                actions: [{slug: 'turn-on', name: 'encender'}, {slug: 'turn-off', name: 'apagar'}]
            },
            {
                type: 'oven',
                name: 'Horno',
                actions: [{slug: 'turn-on', name: 'encender'}, {slug: 'turn-off', name: 'apagar'}]
            },
            {
                type: 'a/c',
                name: 'Aire acondicionado',
                actions: [{slug: 'turn-on', name: 'encender'}, {slug: 'turn-off', name: 'apagar'}]
            }
        ],
        devices: [{
            name: "luz-1",
            room: "bedroom",
            type: "light",
            hash: 3208380,
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
            return state.routines.map(e => e.routine)
        },
        getRoutine: (state) => (name) => {
            return state.routines.find(e => e.routine === name)
        },
        groupsNoSlug: (state) => (room) => {
            return state.devices.filter(d => d.room === room).map(d => textToSlug(d.group));
        },
        deviceExists: (state) => (type, name) => {
            return state.devices.find(d => d.type === type && d.name === name);
        },
        getDevice: (state) => (name, room) => {
            return state.devices.find(d => d.room === room && d.name === name);
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
        addRoom(state, room) {
            state.rooms.push(textToSlug(room));
        },
        addDevice(state, device) {
            device.name = textToSlug(device.name)
            device.group = textToSlug(device.group)
            state.devices.push(device);
        },
        addActionToRoutine(state, payLoad) {
          const routine = state.routines.find(r => r.routine === payLoad.routine)
            routine.actions.push(payLoad.action)
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
            state.routines = state.routines.filter(el => el.name !== routine)
        },
        deleteDevice(state, payLoad) {
            state.devices = state.devices.filter(el => !(el.name === textToSlug(payLoad.name) && el.room === textToSlug(payLoad.room)))
        },
        editDeviceName(state, payLoad) {
            const idx = state.devices.findIndex(el => el.name === textToSlug(payLoad.name) && el.room === textToSlug(payLoad.room))
            const device = state.devices[idx]
            device.name = textToSlug(payLoad.newName)
            Vue.set(state.devices, idx, device)
        },
        editRoomName(state, payLoad) {
            const idx = state.rooms.findIndex(e => e === textToSlug(payLoad.name));
            Vue.set(state.rooms, idx, textToSlug(payLoad.newName))
        },
        editRoutineName(state, payLoad) {
            const idx = state.routines.findIndex(e => e.name === textToSlug(payLoad.name));
            const routine = state.routines[idx]
            routine.name = textToSlug(routine.name)
            Vue.set(state.routines, idx, routine)
        }
    },

});
