<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Groupomania</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation" >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Compte
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="nav-link" to="/profile"
                  ><i class="fas fa-user-edit"></i> Profile</router-link
                >
              </li>
              <li>
                <router-link class="nav-link" to="/login"
                  ><i class="fas fa-sign-in-alt"></i> Se Connecter</router-link
                >
              </li>
              <li>
                <router-link class="nav-link" to="/login" v-on:click="Logout()"
                  ><i class="fas fa-sign-out-alt"></i> Déconnexion</router-link
                >
              </li>
            </ul>
          </li>
        </ul>

        <router-link class="btn btn-outline-secondary" to="/inscription">
          <i class="fas fa-edit"></i> Inscription
        </router-link>
        <router-link class="btn btn-outline-info" to="/about">
          <i class="fas fa-info"></i>
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container">
       <span class="mt-5 mb-3 text-muted">Copyright 2021&copy;</span>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      allMessages: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #18426d;
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