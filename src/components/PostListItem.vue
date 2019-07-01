<template>
  <router-link :to="'/posts/' + id" class="post-list-item">
    <img src="https://picsum.photos/400/500" class="post-list-item__image" />
    <h2 class="post-list-item__title">{{ title }}</h2>
    <div class="post-list-item__details">
      <p class="author">{{ author }}</p>
      <small class="date">{{ formattedDate }}</small>
    </div>
  </router-link>
</template>

<script>
// @ is an alias to /src

export default {
  props: {
    title: String,
    author: String,
    id: String,
    date: String
  },
  computed: {
    formattedDate() {
      let date = this.date;
      return `${date.substring(0, 4)}.${date.substring(5, 7)}.${date.substring(
        5,
        7
      )}`;
    }
  }
};
</script>

<style scoped lang="scss">
.post-list-item {
  text-decoration: none;
  color: #343434;
  background: #f9f9f9;
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 3px #dedede;
  transition: transform 0.2s;

  &:hover {
    box-shadow: 1px 2px 5px #cbcbcb;
    transform: scale(1.01);
  }

  &__image {
    object-fit: cover;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    width: 100%;
    height: 15rem;
  }

  &__title {
    text-align: left;
    padding: 1rem;
    width: 70%;
    overflow: hidden;
  }

  &__details {
    width: 30%;
    text-align: right;
    padding: 1rem;
    .author,
    .date {
      color: gray;
      font-size: 0.8rem;
      line-height: 0.8rem;
    }
  }
}
</style>
