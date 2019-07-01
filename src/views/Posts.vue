<template>
  <div class="blog-posts">
    <post-list-item
      v-for="(post, i) in posts"
      v-bind="post"
      :key="i + 1"
    ></post-list-item>
  </div>
</template>

<script>
import PostListItem from "../components/PostListItem.vue";

export default {
  name: "posts",
  data: function() {
    return {
      posts: this.$store.state.posts
    };
  },
  components: {
    PostListItem: PostListItem
  }
};
</script>
<style scoped lang="scss">
.blog-posts {
  width: 98%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin: 5px auto 0;
}
</style>
