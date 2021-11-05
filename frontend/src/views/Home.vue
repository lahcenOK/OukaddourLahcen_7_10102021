<template>
  <div>
    <nav class="navbar navbar-expand-lg text-white">
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
            <router-link class="nav-link active text-light" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-light"
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
        <router-link class="btn btn-outline-light" to="/inscription">
          <i class="fas fa-edit"></i> Inscription
        </router-link>
        <router-link class="btn btn-outline-info" to="/about">
          <i class="fas fa-info"></i>
        </router-link>
      </div>
    </nav>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 mt-5">
          <div class="card bg-light">
            <p class="h5 my-3 text-center" style="color: #091f43">
              Bienvenu sur le réseau social interne
            </p>
            <div
              class="
                card-header
                bg-light
                d-flex
                flex-column
                justify-content-center
              "
            >
              <img
                src="../assets/icon-logo.png"
                class="mx-5"
                width=""
                height="70"
                alt="logo groupomania"
              />
            </div>
            <div class="card-body">
              <p>
                Cette application est strictement réservé au personnel du
                groupe.
              </p>
            </div>

            <div class="card-footer bg-light d-flex justify-content-center">
              <router-link v-if="!is_loged" class="nav-link" to="/login"
                ><i class="fas fa-sign-in-alt"></i>
                <span class="text-dark"
                  >Veuillez vous identifier pour y accéder
                </span></router-link
              >
              <div class="d-flex" v-if="is_loged">
                <router-link
                  class="nav-link btn-light btn-lg text-white ps-5 pe-5"
                  to="/navigate"
                  >Forum</router-link
                >
                <router-link
                  class="nav-link btn btn-danger btn-lg text-white"
                  to="/login"
                  v-on:click="Logout()"
                >
                  Déconnexion</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      is_loged: false,
    };
  },
  methods: {
    Loged() {
      if (localStorage.getItem("token")) this.is_loged = true;
      else this.is_loged = false;
    },
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.Loged();
  },
};
</script>

<style scoped>
.navbar-expand-lg {
  background-color: #132542;
  color: white;
}
.btn-light {
  border: none;
  background-color: #132542;
  cursor: pointer;
}
</style>