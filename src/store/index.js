import Vue from 'vue';
import Vuex from 'vuex';
import room from "./module/room";
import routine from "./module/routine";
import device from "@/store/module/device";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        room,
        routine,
        device
    },

    state: {
        selectedRoom: "",
        selectedRoutine: "",
        editRoomPressed: false,
        editTheRoomPressed: false,
        editRoutinePressed: false,
        editActionsPressed: false,

        snackBarErrorMessage: "",

        supportedDevices: [
            {
                type: 'lamp',
                name: 'Lámpara',
                id: "go46xmbqeomjrsjr",
                icon: 'mdi-lightbulb',
                actions: [
                    {
                        name: 'Estado',
                        component: "OnOff",
                        props: {apiId: ['turnOn', 'turnOff'], statusParam: "status", disable: false}
                    },
                    {
                        name: 'Cambiar color',
                        component: "ColorPicker",
                        props: {apiId: 'setColor', statusParam: "color"}},
                    {
                        name: 'Cambiar brillo',
                        component: "NumberPicker",
                        props: {
                            apiId: 'setBrightness',
                            min: 0,
                            max: 100,
                            label: "Cambiar brillo",
                            statusParam: "brightness"
                        }
                    }]
            },
            {
                type: 'blinds',
                name: 'Cortina',
                id: "eu0v2xgprrhhg41g",
                icon: 'mdi-blinds',
                actions: [
                    {
                        name: 'Estado',
                        component: "SwitchButton",
                        props: {
                            apiId: ['open', 'close'],
                            statusParam: "status",
                            msg: ['ABRIR', 'CERRAR'],
                            possibleStatus: ['opened', 'closed']
                        }
                    },
                    {
                        name: 'Porcentaje de cerrado',
                        component: "NumberPicker",
                        props: {
                            apiId: 'setLevel',
                            min: 0,
                            max: 100,
                            label: "Porcentaje de cerrado",
                            statusParam: "level",
                            disable: true
                        }
                    }]
            },
            {
                type: 'vacuum',
                id: "ofglvd9gqx8yfl3l",
                name: 'Aspiradora',
                icon: 'mdi-robot-vacuum',
                actions: [
                    {
                        name: 'Cambiar estado',
                        component: "OnOff",
                        props: {apiId: ['start', 'pause'], statusParam: "status", disable: true}
                    },
                    {
                        name: 'Volver a estación',
                        component: "Button",
                        props: {apiId: 'dock', label: 'Volver a estación de carga'}
                    },
                    {
                        name: 'Cambiar ubicación',
                        component: "SelectFromArray",
                        props: {
                            statusParam: ["location", "id"],
                            apiId: "setLocation",
                            getter: "getRoomsForSelect",
                            label: "Habitaciones",
                            title: "Cambiar ubicación"
                        }
                    },
                    {
                        name: 'Establecer modo',
                        component: "SelectFromArray",
                        props: {
                            apiId: 'setMode',
                            statusParam: "mode",
                            getter: "getVacuumModes",
                            label: "Modos",
                            title: "Establecer modo"
                        }
                    }]
            },
            {
                type: 'oven',
                id: "im77xxyulpegfmv8",
                name: 'Horno',
                icon: 'mdi-stove',
                actions: [
                    {
                        name: 'Cambiar estado',
                        component: "OnOff",
                        props: {apiId: ['turnOn', 'turnOff'], statusParam: "status", disable: false}
                    },
                    {
                        name: 'Establecer temperatura',
                        component: "NumberPicker",
                        props: {
                            min: 90,
                            max: 230,
                            label: "Temperatura",
                            apiId: 'setTemperature',
                            statusParam: 'temperature'
                        }
                    },
                    {
                        name: 'Establecer fuente de calor',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'heat',
                            getter: "getHeatSources",
                            label: "Fuentes de calor",
                            title: "Cambiar fuente de calor",
                            apiId: "setHeat"
                        }
                    },
                    {
                        name: 'Establecer modo grill',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'grill',
                            apiId: 'setGrill',
                            getter: "getGrillModes",
                            label: "Modos grill",
                            title: "Cambiar modo grill"
                        }
                    },
                    {
                        name: 'Establecer modo de convección',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'convection',
                            apiId: 'setConvection',
                            getter: "getConvectionModes",
                            label: "Modos de convección",
                            title: "Cambiar modo de convección"
                        }
                    }]
            },
            {
                type: 'ac',
                id: "li6cbv5sdlatti0j",
                name: 'Aire acondicionado',
                icon: 'mdi-fan',
                actions: [
                    {
                        name: 'Cambiar estado',
                        component: "OnOff",
                        props: {apiId: ['turnOn', 'turnOff'], statusParam: "status", disable: false}
                    },
                    {
                        name: 'Establecer temperatura',
                        component: "NumberPicker",
                        props: {
                            min: 18,
                            max: 38,
                            label: "Temperatura",
                            apiId: 'setTemperature',
                            statusParam: 'temperature'
                        }
                    },
                    {
                        name: 'Establecer modo',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'mode',
                            getter: "getACModes",
                            label: "Modos de aire",
                            title: "Cambiar modo de aire",
                            apiId: "setMode"
                        }
                    },
                    {
                        name: 'Establecer posición de aspas verticales',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'verticalSwing',
                            getter: "getVerticalSwings",
                            label: "Modos de swing vertical",
                            title: "Cambiar swing vertical",
                            apiId: "setVerticalSwing"
                        }
                    },
                    {
                        name: 'Establecer posición de aspas horizontales',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'horizontalSwing',
                            getter: "getHorizontalSwings",
                            label: "Modos de swing horizontal",
                            title: "Cambiar swing horizontal",
                            apiId: "setHorizontalSwing"
                        }
                    },
                    {
                        name: 'Establecer velocidad de ventilador',
                        component: "SelectFromArray",
                        props: {
                            statusParam: 'fanSpeed',
                            getter: "getFanSpeeds",
                            label: "Velocidades de aire",
                            title: "Cambiar velocidad de aire",
                            apiId: "setFanSpeed"
                        }
                    }]
            }
        ]

    },

    getters: {
        getDeviceTypeObj: (state) => (name) => {
            return state.supportedDevices.find(d => d.name === name)
        },
        getVacuumModes: () => {
            return [{apiValue: "vacuum", value: "Aspirar"}, {apiValue: "mop", value: "Trapear"}]
        },
        getRoomsForSelect: (state, getters) => {
            return getters['room/getRooms'].map(r => ({apiValue: r.id, value: r.name}))
        },
        getHeatSources: () => {
            return [{apiValue: "top", value: "Superior"},
                {apiValue: "bottom", value: "Inferior"},
                {apiValue: "conventional", value: "Convencional"}]
        },
        getGrillModes: () => {
            return [{apiValue: "large", value: "Grande"},
                {apiValue: "eco", value: "Ecológico"},
                {apiValue: "off", value: "Apagado"}]
        },
        getConvectionModes: () => {
            return [{apiValue: "normal", value: "Normal"},
                {apiValue: "eco", value: "Ecológico"},
                {apiValue: "off", value: "Apagado"}]
        },
        getACModes: () => {
            return [{apiValue: "cool", value: "Frío"},
                {apiValue: "heat", value: "Calor"},
                {apiValue: "fan", value: "Ventilador"}]
        },
        getVerticalSwings: () => {
            return [{apiValue: "auto", value: "Automático"},
                {apiValue: "22", value: "22 grados"},
                {apiValue: "45", value: "45 grados"},
                {apiValue: "67", value: "67 grados"},
                {apiValue: "90", value: "90 grados"}]
        },
        getHorizontalSwings: () => {
            return [{apiValue: "auto", value: "Automático"},
                {apiValue: "-90", value: "-90 grados"},
                {apiValue: "-45", value: "-45 grados"},
                {apiValue: "0", value: "0 grados"},
                {apiValue: "45", value: "45 grados"},
                {apiValue: "90", value: "90 grados"}
            ]
        },
        getFanSpeeds: () => {
            return [{apiValue: "auto", value: "Automático"},
                {apiValue: "25", value: "25%"},
                {apiValue: "50", value: "50%"},
                {apiValue: "75", value: "75%"},
                {apiValue: "100", value: "100%"},
            ]
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
            state.rooms.push(room);
        },
        addDevice(state, device) {
            state.devices.push(device);
        },
        selectRoom(state, room) {
            state.selectedRoom = room;
        },
        selectRoutine(state, routine) {
            state.selectedRoutine = routine;
        }
    }
});

