import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import MainPage from "../views/MainPage.vue";
import UserProfile from "../views/User-Profile.vue";
import AuctionDetail from "../views/AuctionDetail.vue";
import UserList from "../views/UserList.vue";
import NewAuction from "../views/NewAuction.vue";
import SignIn from "../views/UserRegistration.vue";
import UserDetail from "../views/UserDetail.vue";

const routes = [
  { path: "/", name: "mainpage", component: MainPage },
  { path: "/login", name: "login", component: Login },
  { path: "/profile", name: "profile", component: UserProfile },
  { path: "/auction/:id", name: "auctiondetail", component: AuctionDetail, props: route => ({ id: Number(route.params.id) })},
  { path: "/users", name: "userList", component: UserList },
  { path: "/newauction", name: "newAuction", component: NewAuction },
  { path: "/signin", name: "Signin", component: SignIn },
  { path: "/user/:id", name: "userDetail", component: UserDetail, props: route => ({ id: Number(route.params.id) }),
},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
 

export default router;
