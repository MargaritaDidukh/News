import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import BlogPreview from "../views/BlogPreview";
import ViewBlog from "../views/ViewBlog";
import ListReadingLater from "../views/ListReadingLater";

import CreatePost from "../views/CreatePost.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title: 'Home'
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title: 'Blogs'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title: 'Login'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      title: 'Register'
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta:{
      title: 'Forgot Password'
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta:{
      title: 'Profile'
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta:{
      title: 'Create Post'
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta:{
      title: 'Blog Preview'
    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta:{
      title: 'View Blog'
    }
  },
  {
    path: "/ListReadingLater",
    name: "ListReadingLater",
    component: ListReadingLater,
    meta:{
      title: 'List Reading Later'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) =>{
    document.title =`${to.meta.title} | BlogApp`;
    next();
});
export default router;
