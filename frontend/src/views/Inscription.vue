<template>
  <div>
    <nav id="nav" class="navbar navbar-expand-lg"> 
      <img
        class="ms-3"
        src="../assets/icon-white.png"
        alt="logo-groupomania"
        width="175"
        height="30"
      />
      <div class="container-fluid">
        <ul class="navbar-nav  ms-5 text-light">
          <li>
          <router-link class="nav-link text-light" to="/">Home</router-link>
        </li>
        </ul>
      </div>
    </nav>
    <div class="hlink">
      <h4 class="fw-bolder mt-5">Inscription :</h4>
    </div>
    <form method="post" @submit.prevent="buttonSignup">
      <input
        type="email"
        v-model="email"
        class="form-control"
        placeholder="email@exemple.com"
      />
      <input
        type="text"
        v-model="name"
        class="form-control"
        placeholder="Nom"
      />
      <input
        type="text"
        v-model="firstname"
        class="form-control"
        placeholder="Prénom"
      />
      <input
        type="password"
        class="form-control"
        id="password-input"
        placeholder="Votre mot de passe"
        v-model="password"
      />

      <button
        class="w-50 btn-lg text-white active"
        type="submit"
        @click.prevent="buttonSignup"
      >
        S'inscrire
      </button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "inscription",
  data() {
    return {
      email: "",
      name: "",
      firstname: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async buttonSignup() {
      const data = {
        email: this.email,
        name: this.name,
        firstname: this.firstname,
        password: this.password,
      };
      await axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
input {
  margin: auto;
  margin-bottom: 5px;
  width: 50%;
}
.navbar-expand-lg{
  background-color: #132542;
  color: white;
}
button {
  border-radius: 0.3rem;
  background-color: #132542;
  cursor: pointer;
}
.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
</style>