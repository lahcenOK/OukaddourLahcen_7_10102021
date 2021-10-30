<template>
    <div class="container">
        <div>
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
        aria-label="Toggle navigation"
      >
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
  </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 mt-5">
                <div class="card bg-light">
                    <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                    <div class="card-header bg-light d-flex flex-column justify-content-center">
                        <img src="../assets/icon-logo.png" class="mx-5" width="" height="70" alt="logo groupomania">  
                    </div>
                    <div class="card-body">
                        <p>Cette application est strictement réservé au personnel du groupe.</p>
                     </div>
                    
                    <div class="card-footer bg-light d-flex justify-content-center">
                        <span class="text-dark">Veuillez vous identifier pour y accéder </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>
<style>
</style>