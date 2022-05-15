import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomView from "@/views/RoomView";
import AddDeviceView from "@/views/AddDeviceView";
import LightView from "@/views/devices/LampView";
import OvenView from "@/views/devices/OvenView";
import VacuumView from "@/views/devices/VacuumView";
import BlindsView from "@/views/devices/BlindsView";
import store from '../store'
import RoutineView from "@/views/RoutineView";
import AddRoutineActionView from "@/views/AddRoutineActionView";
import HelpView from "@/components/ViewButtons/HelpView";
import AirConditionerView from "@/views/devices/AirConditionerView";

Vue.use(VueRouter)

const deviceExistsFunc = (to, from, next) => {
  // reject the navigation
  if (!store.getters['device/getDevice'](to.params.deviceName))
    next({name: 'notFound'})

  next();
}

const roomExistsFunc = (to, from, next) => {
  // reject the navigation
  if (!store.state.room.rooms.find(r => r.name === to.params.room))
    next({name: 'notFound'})

  next();
}

const routineExistsFunc = (to, from, next) => {
  // reject the navigation
  if (!store.state.routine.routines.find(e => e.name === to.params.routine))
    next({name: 'notFound'})

  next();
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rooms/:room',
    name: 'room',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RoomView,
    beforeEnter: roomExistsFunc
  },
  {
    path: '/routines/:routine',
    name: 'routine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RoutineView,
    beforeEnter: routineExistsFunc
  },
  {
    path: '/routines/:routine/add-action',
    name: 'addRoutine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddRoutineActionView,
  },
  {
    path: '/rooms/:room/add-device',
    name: 'addDevice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddDeviceView
  },
  {
    path: '/rooms/:room/lamp/:deviceName',
    name: 'lamp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LightView,
    beforeEnter: deviceExistsFunc,
  },
  {
    path: '/rooms/:room/blinds/:deviceName',
    name: 'blinds',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BlindsView,
    beforeEnter: deviceExistsFunc,
  },
  {
    path: '/rooms/:room/vacuum/:deviceName',
    name: 'vacuum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: VacuumView,
    beforeEnter: deviceExistsFunc,
  },
  {
    path: '/rooms/:room/oven/:deviceName',
    name: 'oven',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OvenView,
    beforeEnter: deviceExistsFunc,
  },
  {
    path: '/rooms/:room/ac/:deviceName',
    name: 'ac',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AirConditionerView,
    beforeEnter: deviceExistsFunc,
  },
  {
    path: '/404',
    alias: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
  },
  {
    path: '/help',
    name: 'help',

    component: HelpView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
