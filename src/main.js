import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  if(err.code === 1 ){
    store.state.snackBarErrorMessage = "El nombre ingresado es incorrecto"
  }
  if(err.code === 2 ){
    store.state.snackBarErrorMessage = "El elemento ingresado ya existía"
  }
  if(err.code === 3){
    store.state.snackBarErrorMessage = "Hubo un error de nuestro lado, vuelva a intentarlo"
  }
  if(err.code === 4){
    store.state.snackBarErrorMessage = "Ups! Algo salió mal, vuelva a intentarlo"
  }
  vm
  info
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
