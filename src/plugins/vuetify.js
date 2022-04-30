import Vue from 'vue';
import colors from 'vuetify/lib/util/colors'
import Vuetify from "vuetify";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.darken1, // #E53935
                secondary: colors.red.lighten4, // #FFCDD2
                accent: colors.yellow.lighten3, // #3F51B5
            },
        },
    },
})
