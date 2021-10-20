<template>
  <div class="container">
<img  class="mb-4"  src="../assets/icon-logo.png"
        alt=""        width=""    height="60" />     

    <h1>Inscription</h1>
    <form method="post" @submit.prevent="buttonSignup">      
        <input type="email" v-model="email" class="form-control" placeholder="email@exemple.com">
        <input type="text" v-model="name" class="form-control" placeholder="Nom">
        <input type="text" v-model="firstname" class="form-control" placeholder="Prénom">
        <input
          type="password"
          class="form-control"
          id="password-input"
          placeholder="Votre mot de passe"
          v-model="password" />
      
      <button class="btn btn-warning" type="submit" @click.prevent="buttonSignup">S'inscrire</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "register",
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
.container{
 padding-top:10%;
}

input {  
  margin:auto;
  margin-bottom: 20px;
  width: 50%;
}

.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin-top: 30px;
  padding: 10px;
}
</style>