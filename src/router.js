import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Posts from "./views/Posts.vue";
import New from "./views/New.vue";
import Post from "./components/Post.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/posts",
      name: "posts",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Posts
    },
    {
      path: "/new",
      name: "new",
      component: New,
      props: { adding: true }
    },
    {
      path: "/posts/:id",
      name: "post",
      component: Post
    },
    {
      path: "/edit/:id",
      name: "editPost",
      component: New,
      props: { adding: false }
    },
    {
      path: "*",
      component: NotFound
    },
    {
      path: "/posts*",
      component: NotFound
    },
    {
      path: "/new*",
      component: NotFound
    }
  ]
});
