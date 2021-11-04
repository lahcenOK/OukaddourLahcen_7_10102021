<template>
 <div class="">
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
          <router-link class="nav-link text-light active" to="/">Home</router-link>
        </li>
        </ul>
      </div>
    </nav>
  <form class="form-signin" method="post" @submit.prevent="buttonLogin">
       
    <h4 class="fw-bolder mt-5">Identifiez-vous:</h4>

    <div class="form-floating">
      <input
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        v-model="email"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        v-model="password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me" /> Se souvenir de moi
      </label>
    </div>
    <button class="w-100 btn btn-lg text-light active" type="submit">
      Se connecter
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
  name: "login",
  data() {
    return {
      token: "",
      email: "",
      password: "",
      userId: "",
      error: "",
    };
  },
  methods: {
    async buttonLogin() {
      await axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userId);
          }
          this.$router.push("/navigate");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style scoped>

button {
  border-radius: 0.3rem;
  background-color: #132542;

}
.navbar-expand-lg{
  background-color: #132542;
  color: white;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 1px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>