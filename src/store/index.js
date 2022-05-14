import Vue from 'vue';
import Vuex from 'vuex';
import {textToSlug} from "../../utils/Utils";
import room from "./module/room"
import routine from "./module/routine"
import device from "@/store/module/device";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        room,
        routine,
        device
    },

    state: {
        rooms: ['bedroom', 'living', 'uno', 'bathroom', 'gameroom', 'office', 'kitchen'],
        routines: [{
            routine: 'buen-dia',
            actions: [{device: 'luz-1', room: 'bedroom', action: 'cambiar-estado',
                value: [true, 'encendido']}, {
                device: 'luz-1',
                room: 'bedroom',
                action: 'cambiar-estado',
                value: [true, 'encendido']
            }]
        }, {
            routine: 'a-dormir',
            actions: [{device: 'luz-1', room: 'bedroom', action: 'cambiar-estado',
                value: [true, 'encendido']}, {
                device: 'luz-1',
                room: 'bedroom',
                action: 'cambiar-estado',
                value: [true, 'encendido']
            }]
        }],
        selectedRoom: "",
        selectedRoutine: "",
        editRoomPressed: false,
        editTheRoomPressed: false,
        editRoutinePressed: false,
        editActionsPressed: false,
        supportedDevices: [
            {
            type: 'lamp',
            name: 'Lámpara',
                id: "go46xmbqeomjrsjr",
                icon: 'mdi-lightbulb',
            actions: [
                { name: 'estado', component: "OnOff", props: {apiId: ['turnOn', 'turnOff'], statusParam: "status"}},
                { name: 'cambiar-color', component: "ColorPicker", props: {apiId: 'setColor'}, statusParam: "color"},
                { name: 'cambiar-intensidad', component: "NumberPicker", props: {apiId: 'setBrightness', min: 0, max: 100, label: "Brillo", statusParam: "brightness"}}]
            },
            {
                type: 'vacuum',
                id: "ofglvd9gqx8yfl3l",
                name: 'Aspiradora',
                icon: 'mdi-robot-vacuum',
                actions: [
                    {slug: 'state', name: 'cambiar-estado', component: "OnOff", props: {}},
                    {slug: 'resume', name: 'estado-de-reproducción', component: "PlayPause", props: {}},
                    {slug: 'change-location', name: 'cambiar-ubicación', component: "SelectFromArray", props:{getter: "getRoomsForSelect", label: "Habitaciones"}},
                    {slug: 'return-to-base', name: 'volver-a-estación-de-carga'},
                    {slug: 'set-mode', name: 'establecer-modo', component: "SelectFromArray", props:{getter: "getVacuumModes", label: "Modos"}},
                    {slug: 'change-charge-location', name: 'cambiar-ubicación-de-base-de-carga', component: "SelectFromArray", props:{getter: "getRoomsForSelect", label: "Habitaciones"}} ]
            },
            {
                type: 'alarm',
                id: "mxztsyjzsrq7iaqc",
                name: 'Alarma',
                icon: 'mdi-shield-home',
                actions: [
                    {slug: 'activate-house', name: 'activar modo casa'},
                    {slug: 'activate-regular', name: 'activar modo normal'},
                    {slug: 'change-code', name: 'cambiar código', component: "SecurityCode", props: {}},
                    {slug: 'deactivate', name: 'desactivar'}]
            },
            {
                type: 'oven',
                id: "im77xxyulpegfmv8",
                name: 'Horno',
                icon: 'mdi-stove',
                actions: [
                    {slug: 'state', name: 'cambiar-estado', component: "OnOff"},
                    {slug: 'set-temperature', name: 'establecer-temperatura', component: "NumberPicker", props: {min: 90, max: 230, label: "Temperatura"}},
                    {slug: 'set-source', name: 'establecer-fuente-de-calor', component: "SelectFromArray", props: {getter: "getHeatSources"}},
                    {slug: 'set-grill', name: 'establecer-modo-grill'},
                    {slug: 'set-convection', name: 'establecer-modo-conveccion'}]
            },
            {
                type: 'ac',
                id: "li6cbv5sdlatti0j",
                name: 'Aire acondicionado',
                icon: 'mdi-fan',
                actions: [
                    {slug: 'state', name: 'cambiar-estado', component: "OnOff"},
                    {slug: 'set-temperature', name: 'establecer-temperatura', component: "NumberPicker", props: {min: 18, max: 38, label: "Temperatura"}},
                    {slug: 'set-mode', name: 'establecer-modo'},
                    {slug: 'set-horizontal', name: 'establecer-posicion-de-aspas-horizontales'},
                    {slug: 'set-vertical', name: 'establecer-posicion-de-aspas-verticales'},
                    {slug: 'set-fan-speed', name: 'establecer-velocidad-de-ventilador'}]
            }
        ],
        devices: [{
            name: "luz-1",
            id: "fffdac4e75b47e97",
            room: "bedroom",
            type: "light",
            hash: 3208380,
            group: "grupo-1"
        },
            {
                name: "aspiradora-1",
                id: "d14cc2eaa9795ae2",
                room: "bedroom",
                type: "vacuum",
                group: "grupo-1"
            },
            {
                name: "horno-1",
                room: "bedroom",
                type: "oven",
                group: "grupo-1"
            },
            {
                name: "aire-1",
                room: "bedroom",
                type: "a/c",
                group: "grupo-1"
            },
            {
                name: "alarma-1",
                room: "bedroom",
                type: "alarm",
                group: "grupo-1"
            },
            {
                name: "aspiradora",
                room: "living",
                type: "vacuum",
                group: "grupo-1"
            }]
    },
    getters: {
        getDeviceTypeObj: (state) => (name) => {
            return state.supportedDevices.find(d => d.name === name)
        },
        getRooms: (state) => {
            return state.rooms
        },
        getVacuumModes: () => {
          return [{apiValue: "vacuum", value: "aspirar"}, {apiValue: "mop", value: "trapear"}]
        },
        getRoomsForSelect: (state) => {
            return state.rooms.map(r => ({apiValue: r.name, value: r.name}))
        },
        getHeatSources: () => {
            return [{apiValue: "top", value: "superior"},
                {apiValue: "bottom", value: "inferior"},
                {apiValue: "conventional", value: "convencional"}]
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
        getIcon: (state) => (type) => {
          return state.supportedDevices.find(d => d.type === type).icon
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
        toggleEditActionsPressed(state) {
            state.editActionsPressed = !state.editActionsPressed
        },
        setEditActionsPressed(state, value) {
            state.editActionsPressed = value
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
        deleteActionFromRoutine(state, payLoad) {
          state.routines.find(r => r.routine === payLoad.routine).actions.splice(payLoad.idx, 1)
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
