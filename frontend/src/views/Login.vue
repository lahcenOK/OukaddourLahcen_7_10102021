<template>
 <main class="form-signin">
  <form class="form-signin" method="post" @submit.prevent="buttonLogin">
    <img
      class="mb-4"
      src="../assets/icon-logo.png"
      alt="logo-gropomania"
      width=""
      height="60"
    />
    <div class="hlink">
      <router-link to="/">Home</router-link>
    </div>
    <h2 class="h3 mb-3 fw-normal">Identifiez-vous:</h2>

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
    <button class="w-100 btn btn-lg btn-primary active" type="submit">
      Se connecter
    </button>
  </form>
  <div class="error" v-if="error">
    {{ error.error }}
  </div>
  </main>
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
.hlink {
  margin-top: 0px;
  margin-bottom: 20px;
  font-size: 20px;
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