<template>
  <div class="container">
    <img
      class="mb-4"
      src="../assets/icon-logo.png"
      alt=""
      width=""
      height="60"
    />
    <div class="hlink">
      <router-link to="/">Home</router-link>
    </div>
    <h1>Inscription :</h1>
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
        class="w-50 btn-lg btn-primary active"
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
.hlink {
  margin-top: 0px;
  margin-bottom: 10px;
}
.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  color: white solid;
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
</style>