<template id="template">
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #08153e;
}

#nav {
  padding: 30px;
  opacity: 0.6;
  background-color: transparent;

  a {
    font-weight: bold;
    color: #2c3e50;

    // <a> and class=router-link-exact-active
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  height: 100vh;
  width: auto;
  margin: 0;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    linear-gradient(
      133.86deg,
      #102f7e -11.47%,
      #0c8dd6 3.95%,
      #1aa0ec 19.37%,
      #60c6ff 34.78%,
      #9bdbff 50.19%,
      #b4deda 65.61%,
      #ffd66b 81.02%,
      #ffc178 96.44%,
      #fe9255 111.85%
    );
  background-attachment: fixed;
  box-sizing: border-box;
  margin: -1rem;
}
</style>
