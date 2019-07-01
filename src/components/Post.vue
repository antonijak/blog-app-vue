<template>
  <div class="post">
    <div class="buttons">
      <router-link to="/posts" class="buttons__button">Back</router-link>
      <router-link :to="nextId" class="buttons__button">Next</router-link>
    </div>
    <h2 class="post__title">{{ post.title }}</h2>
    <p class="post__date">{{ post.date }}</p>
    <transition appear enter-active-class="animated slideInLeft">
      <p class="post__body">{{ post.body }}</p>
    </transition>
    <div class="modify">
      <router-link :to="editRoute" class="button-main">Edit</router-link>
      <button @click="deletePost" class="button-main">Delete</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import store from "../store/store";

export default {
  data: function() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    ...mapState([
      // map this.count to store.state.count
      "posts"
    ]),
    nextId() {
      let thisIndex = this.posts.indexOf(this.post);
      return this.posts[thisIndex + 1]
        ? "/posts/" + this.posts[thisIndex + 1].id
        : this.posts[0].id;
    },
    editRoute() {
      let thisIndex = this.posts.indexOf(this.post);
      return "/edit/" + this.id;
    },
    post() {
      return this.posts.find(item => item.id === this.$route.params.id);
    }
  },
  methods: {
    deletePost() {
      if (confirm("Are you sure you want to delete?")) {
        store.commit("DELETE_POST", this.post.id);
        this.$router.push("/posts");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.post {
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  .buttons {
    display: flex;
    justify-content: space-between;

    &__button {
      padding: 0.5rem 1rem;
      border: none;
      background: none;
      border-radius: 10px;
      font-size: 0.9rem;
      outline: none;
      font-weight: bold;
      letter-spacing: 3px;
      text-decoration: none;
      color: #49afff;
      display: block;
      text-align: left;
      &:hover {
        color: gray;
      }
    }
  }

  &__title {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-family: Marion;
  }

  &__date {
    color: gray;
    font-size: 0.8rem;
  }

  &__body {
    line-height: 2rem;
    padding: 1rem;
    width: 80%;
    margin: 0 auto;
    font-size: 1.1rem;
    position: relative;

    &:before {
      content: "";
      border: 8px solid black;
      position: absolute;
      top: 1.5rem;
      left: 0rem;
    }

    &:after {
      content: "";
      border: 8px solid #2b2b2b;
      position: absolute;
      bottom: 1.5rem;
      right: 0rem;
    }
  }

  .modify {
    display: flex;
    justify-content: space-around;
  }

}
</style>
