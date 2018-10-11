<template>
  <div id="app">
    <router-view></router-view> <!-- Display route for main page -->
  </div>
</template>

<style lang="less">
// app-wide theme

:root {
  // prettier-ignore
  font-family: ~"-apple-system, system-ui, BlinkMacSystemFont, “Segoe UI”, “Roboto”, “Oxygen”, “Ubuntu”, “Cantarell”, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, sans-serif";
  font-size: 18px;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
button,
.button {
  padding: 3px 10px 5px;
  border: 1px solid rgb(200, 200, 200);
  background-color: white;
  color: black;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &.primary {
    border: none;
    color: white;
    background-color: rgb(10, 50, 200);
  }
}
</style>

