import Vue from 'vue';
import Vuex from 'vuex';
import slugConverter from "../../utils/Utils";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        rooms: ['bedroom', 'living', 'uno', 'bathroom', 'gameroom', 'office', 'kitchen'],
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
        }

    },

    mutations: {
        addRoom (state, room) {
            state.rooms.push(room);
        },
        addDevice (state, device) {
            state.devices.push(device);
        }
    },
    actions: {

    }

});
