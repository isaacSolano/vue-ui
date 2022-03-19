import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/components/Home/Index.vue";
import Register from "@/components/Users/Register/Index.vue";
import Login from "@/components/Users/Login/Index.vue";
import Dashboard from "@/components/Dashboard/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register_profile",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: []
  }
];

const router = new VueRouter({
  routes
});

export default router;
