import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

function assignErrorMessage(message){
  store.state.snackBarErrorMessage = message
}

Vue.config.errorHandler = function (err, vm, info) {
  if(err.code === 1 ){
   assignErrorMessage("El nombre ingresado es incorrecto")
  }
  else if(err.code === 2 ){
    assignErrorMessage("El elemento ingresado ya existía")
  }
  else if(err.code === 3){
    assignErrorMessage("Hubo un error de nuestro lado, vuelva a intentarlo")
  }
  else if(err.code === 4){
    assignErrorMessage("Ups! Algo salió mal, vuelva a intentarlo")
  }
  else if(err.code === 98){
    assignErrorMessage("Se ha excedido el tiempo de espera, vuelva a intentarlo")
  }
  else if(err.code === 99){
    assignErrorMessage("Error de red. Revise su estado y vuelva a intentarlo")
  }
  else{
    assignErrorMessage("Ocurrió un error inesperado, vuelva a intentarlo")
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
