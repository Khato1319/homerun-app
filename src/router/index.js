import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomView from "@/views/RoomView";
import AddDeviceView from "@/views/AddDeviceView";
import LightView from "@/views/devices/LightView";
import AlarmView from "@/views/devices/AlarmView";
import OvenView from "@/views/devices/OvenView";
import VacuumView from "@/views/devices/VacuumView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/rooms/:room',
    name: 'rooms',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RoomView
  },
  {
    path: '/rooms/:room/add_device',
    name: 'addDevice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddDeviceView
  },
  {
    path: '/rooms/:room/:deviceName',
    name: 'light',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LightView
  },
  {
    path: '/rooms/:room/:deviceName',
    name: 'vacuum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: VacuumView
  },
  {
    path: '/rooms/:room/:deviceName',
    name: 'oven',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OvenView
  },
  {
    path: '/rooms/:room/:deviceName',
    name: 'alarm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AlarmView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
