<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/" class="link">HOME</router-link>
      <router-link to="/posts" class="link">POSTS</router-link>
      <router-link to="/new" class="link">NEW POST</router-link>
    </nav>
    <main>
      <transition name="fade">
        <router-view :key="$route.fullPath" />
      </transition>
    </main>
    <footer></footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style lang="scss">
.fade-enter {
}

.fade-enter-active {
  animation: blur 0.5s linear;
}

@keyframes blur {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 0 auto;
  text-align: center;

  .router-link-exact-active {
    color: #49afff;
  }

  .main-nav {
    background: #49afff;
    padding: 1.25rem;
    color: white;
    position: relative;
    margin-bottom: 10px;
    display: flex;

    &:after {
      content: "";
      width: 100%;
      height: 1rem;
      box-shadow: 1px 1px 3px #dedede;
      position: absolute;
      bottom: -5px;
      left: 0;
      z-index: -1;
    }

    .link {
      box-sizing: border-box;
      color: white;
      font-weight: bold;
      letter-spacing: 2px;
      text-decoration: none;
      margin: 0 0.25rem;
      transition: transform 0.25s;
      padding: 0 0.5rem;
      display: inline-block;
      line-height: 1rem;

      &:hover {
        transform: scale(1.2);
        color: #343434;
        font-weight: bolder;
      }

      &:focus {
        transform: scale(1.2);
        color: #343434;
      }
    }
  }

  main {
    width: 90%;
    padding-top: 1rem;
    margin: 0 auto;
    min-height: 89vh;
  }

  footer {
    background: #49afff;
    padding: 1.25rem;
    color: white;
    position: relative;
    display: flex;
  }

  .button-main {
    width: 6rem;
    background: #49afff;
    text-decoration: none;
    color: white;
    font-size: 1rem;
    padding: .5rem;
    border-radius: 2px;
    border: none;
    line-height: .9rem;
    display: block;

  }
}
</style>
