<template>
  <div>
    <router-view />
    <footer class="mt-auto py-3 bg-light" >
            <span class="mt-5 mb-3 text-muted">Copyright 2021&copy;</span>      
    </footer>
    </div>
</template>

<style>

#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c668f;
}
.btn {
  margin-right: 10px;
}

footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
</style>
