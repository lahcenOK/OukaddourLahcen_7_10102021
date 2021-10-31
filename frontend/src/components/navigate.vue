<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/profile"> Profil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/login" v-on:click="Logout()">
            Déconnexion</router-link
          >
          </li>
        </ul>
       
      </div>
    </nav>
    <h2></h2>
    <div>
      <newPost />
    </div>
    <div>
      <loadPosts />
    </div>
  </div>
</template>


<script>
import loadPosts from "./loadPosts";
import newPost from "./newPost";

export default {
  name: "navigate",
  components: {
    loadPosts,
    newPost,
  },
  data() {
    return {
      token: "",
      allPosts: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  color: black;
}
</style>