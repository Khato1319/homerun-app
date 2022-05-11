import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomView from "@/views/RoomView";
import AddDeviceView from "@/views/AddDeviceView";
import LightView from "@/views/devices/LightView";
import AlarmView from "@/views/devices/AlarmView";
import OvenView from "@/views/devices/OvenView";
import VacuumView from "@/views/devices/VacuumView";
import store from '../store'
import RoutineView from "@/views/RoutineView";
import AddRoutineActionView from "@/views/AddRoutineActionView";
import HelpView from "@/components/ViewButtons/HelpView";

Vue.use(VueRouter)

const deviceExistsFunc = (to, from, next) => {
  // reject the navigation
  if (!store.getters.deviceExists(to.name, to.params.deviceName))
    next({name: 'notFound'})

  next();
}

const roomExistsFunc = (to, from, next) => {
  // reject the navigation
  if (!store.state.rooms.includes(to.params.room))
    next({name: 'notFound'})

  next();
}

const routineExistsFunc = (to, from, next) => {
  // reject the navigation
  if (!store.state.routines.find(e => e.routine === to.params.routine) < 0)
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
    beforeEnter: routineExistsFunc
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
    path: '/rooms/:room/light/:deviceName',
    name: 'light',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LightView,
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
    path: '/rooms/:room/alarm/:deviceName',
    name: 'alarm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AlarmView,
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
