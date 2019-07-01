<template>
  <form class="new-post" v-on="{ submit: adding === true ? addNew : edit }">
    <small>{{ errorMessages.title }}</small>
    <label class="label">
      <p
        :class="{
          label__text: !isActive.title,
          'label__text--active': isActive.title
        }"
      >
        Title
      </p>
      <input
        type="text"
        name="title"
        v-model="newPost.title"
        @click="
          isActive.title = true;
          touched.title = true;
        "
        @blur="hide"
        ref="title"
        id="first-input"
      />
    </label>

    <small>{{ errorMessages.author }}</small>
    <label class="label">
      <p
        :class="{
          label__text: !isActive.author,
          'label__text--active': isActive.author
        }"
      >
        Author
      </p>
      <input
        name="author"
        type="text"
        v-model="newPost.author"
        @click="
          isActive.author = true;
          touched.author = true;
        "
        @blur="hide"
      />
    </label>

    <small>{{ errorMessages.date }}</small>
    <label class="label">
      <p
        :class="{
          label__text: !isActive.date,
          'label__text--active': isActive.date
        }"
        class="date"
      >
        Date
      </p>
      <input
        name="date"
        type="date"
        v-model="newPost.date"
        @click="
          isActive.date = true;
          touched.date = true;
        "
        @blur="hide"
      />
    </label>

    <small>{{ errorMessages.body }}</small>
    <label class="label">
      <p
        :class="{
          label__text: !isActive.body,
          'label__text--active': isActive.body
        }"
      >
        Post
      </p>
      <textarea
        name="body"
        @click="
          isActive.body = true;
          touched.body = true;
        "
        @blur="hide"
        v-model="newPost.body"
      ></textarea>
    </label>
    <button type="submit" class="button-main">Submit</button>
  </form>
</template>

<script>
// @ is an alias to /src
import store from "../store/store";
import { mapState } from "vuex";

export default {
  props: {
    adding: Boolean
  },
  data: function() {
    return {
      newPost: {
        title: "",
        author: "",
        date: "",
        body: ""
      },
      touched: {
        title: false,
        author: false,
        date: false,
        body: false
      },
      isActive: {
        title: false,
        author: false,
        date: false,
        body: false
      },
      errorMessages: {
        title: "",
        author: "",
        date: "",
        body: ""
      }
    };
  },
  computed: {
    ...mapState([
      // map this.count to store.state.count
      "posts"
    ]),
    post() {
      if (this.adding === false) {
        return this.posts.find(item => item.id === this.$route.params.id);
      }
    }
  },
  methods: {
    hide: function(e) {
      let { name, value } = e.target;
      this.isActive = {
        ...this.isActive,
        [name]: this.isActive[name] && value === "" ? false : true
      };
    },
    addNew(e) {
      e.preventDefault();
      let { title, author, date, body } = this.newPost;
      //if all the fields are filled, create post and save it to store

      if (title !== "" && author !== "" && date !== "" && body !== "") {
        let createdPost = {
          title,
          author,
          date,
          body,
          id: Math.random().toString()
        };
        store.commit("ADD_NEW", createdPost);

        // clear all the fields, show labels and set that fields are untouched
        this.newPost.title = "";
        this.newPost.author = "";
        this.newPost.date = "";
        this.newPost.body = "";

        this.isActive = {
          title: false,
          author: false,
          date: false,
          body: false
        };

        this.touched = {
          title: false,
          author: false,
          date: false,
          body: false
        };

        //route back to posts

        this.$router.push("/posts");
      } else {
        //if some of the fields are empty show error messages

        this.validate(true);
      }
    },
    edit(e) {
      e.preventDefault();

      //save changed post to store

      store.commit("EDIT_POST", { id: this.post.id, newPost: this.newPost });

      //route back to posts

      this.$router.push("/posts");
    },
    validate(submit) {
      let { title, author, date, body } = this.newPost;
      let touched = this.touched;
      let errorMessages = this.errorMessages;

      // if user has touched the input but left it empty show error message
      // or if user is trying to submit empty fields show error messages


      title === "" || title === "" && submit === false && touched.title === true
        ? (errorMessages.title = "Title is required")
        : (errorMessages.title = "");

      author === "" || author === "" && submit === false && touched.author === true
        ? (errorMessages.author = "Author is required")
        : (errorMessages.author = "");

      date === "" || date === "" && submit === false && touched.date === true
        ? (errorMessages.date = "Date is required")
        : (errorMessages.date = "");

      body === "" || body === "" && submit === false && touched.body === true
        ? (errorMessages.body = "Post body is required")
        : (errorMessages.body = "");
    }
  },
  mounted() {
    //if it is edit mode and not add remove the labels(placeholders) from the fields so that data would show

    if (this.adding === false) {
      this.newPost = this.post;
      this.isActive = {
        title: true,
        author: true,
        date: true,
        body: true
      };
    }
  },
  updated() {
    let { title, author, date, body } = this.newPost;
    if (title !== "" || author !== "" || date !== "" || body !== "") {
      this.validate(false);
    }
  }
};
</script>

<style scoped lang="scss">
.new-post {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  small {
    color: red;
  }

  .label {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    flex-wrap: wrap;
    width: 50%;
    align-items: flex-start;
    position: relative;

    &:focus-within p {
      color: #49afff;
      width: fit-content;
      margin-right: 1rem;
      position: absolute;
      background: white;
      top: 0;
      left: 1rem;
      padding: 0 5px;
      font-size: 0.7rem;
      animation: slide-up 0.2s linear;
      font-weight: bold;
    }

    &__text {
      width: fit-content;
      margin-right: 1rem;
      color: gray;
      position: absolute;
      background: white;
      top: 0.7rem;
      left: 0.7rem;
      padding: 7px;
      font-size: 1rem;

      &--active {
        width: fit-content;
        margin-right: 1rem;
        position: absolute;
        background: white;
        top: 0;
        left: 1rem;
        padding: 0 5px;
        font-size: 0.7rem;
        animation: slide-up 0.2s linear;
        font-weight: bold;
        color: gray;
      }

      @keyframes slide-up {
        0% {
          top: 1.1rem;
          font-size: 1rem;
        }

        50% {
          top: 0.5rem;
          font-size: 0.85rem;
        }

        100% {
          top: 0;
          font-size: 0.7rem;
        }
      }

      &.date {
        display: block;
        width: 10rem;
        text-align: left;
      }
    }

    input {
      border-radius: 5px;
      border: 1px solid #dadada;
      padding: 0.5rem;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      font-size: 1rem;
      outline: none;
      width: 100%;

      &:focus {
        border: 2px solid #49afff;
      }
    }

    textarea {
      border-radius: 5px;
      border: 1px solid #dadada;
      padding: 0.5rem;
      width: 100%;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      font-size: 1rem;
      outline: none;
      height: 20rem;

      &:focus {
        border: 2px solid #49afff;
      }
    }
  }
}
</style>
