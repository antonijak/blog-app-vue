import Vue from "vue";
import Vuex from "vuex";
import { ADD_NEW } from "./mutation-types";
import { EDIT_POST } from "./mutation-types";
import { DELETE_POST } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [
      {
        id: "1",
        title: "This is my blog post",
        date: "2019-01-01",
        author: "Some Author",
        body:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        id: "2",
        title: "This is my blog post 2",
        date: "2019-01-01",
        author: "Some Author",
        body: "Lorem ipsum dolor sit amet"
      },
      {
        id: "3",
        title: "This is my blog post 3",
        date: "2019-01-01",
        author: "Some Author",
        body: "Lorem ipsum dolor sit amet"
      }
    ]
  },
  mutations: {
    [ADD_NEW](state, payload) {
      state.posts = [...state.posts, payload];
    },
    [EDIT_POST](state, payload) {
      let { id, newPost } = payload;
      state.posts = state.posts.map(post => (post.id === id ? newPost : post));
    },
    [DELETE_POST](state, payload) {
      state.posts = state.posts.filter(post => post.id !== payload);
    }
  },
  actions: {}
});
