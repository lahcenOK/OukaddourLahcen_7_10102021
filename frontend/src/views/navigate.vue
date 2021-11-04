<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <img
        class="ms-3"
        src="../assets/icon-white.png"
        alt="logo-groupomania"
        width="175"
        height="30"
      />
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active ms-3  text-light" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active ms-3  text-light" to="/profile"> Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active ms-3 text-light" to="/login" v-on:click="Logout()">
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
import loadPosts from "../components/loadPosts";
import newPost from "../components/newPost";

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
.navbar-expand-lg{
  background-color: #132542;
  color: white;
}
</style>
