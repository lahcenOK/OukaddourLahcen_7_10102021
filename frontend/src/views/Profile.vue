<template>
  <div>
    <nav id="nav" class="navbar navbar-expand-lg"> 
      <div class="img_nav">
        <img
        class=" ms-3"
        src="../assets/icon-white.png"
        alt="logo-groupomania"
        width="175"
        height="30"
      />
      </div>
      <div class="container-fluid">
        <ul class="navbar-nav  ms-5 text-light">
          <li>
          <router-link class="nav-link text-light active" to="/">Home</router-link>
        </li>
        </ul>
      </div>
    </nav>

    <div>
      <h4 class="fw-bolder mt-4">Profil :</h4>
      <p>
        <u>E-mail</u>:
        {{ dataProfile.email }}
      </p>
      <p>
        <u>Nom et prénom</u>: {{ dataProfile.name }} {{ dataProfile.firstname }}
      </p>
    </div>
    <form method="post" @submit.prevent="updateProfile">
      <div>
        <label for="name"></label>
        <input type="name" id="name" placeholder="Nom" v-model="name" />
      </div>
      <div>
        <label for="firstname"></label>
        <input
          type="firstname"
          id="firstname"
          placeholder="Prénom"
          v-model="firstname"
        />
      </div>
      <button
        class="btn-light text-light btn-lg ps-4 pe-4"
        type="submit"
        @click.prevent="updateProfile"
      >
        Modifier
      </button>
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
      <button
        class=" btn-danger btn-lg text-light"
        type="submit"
        @click.prevent="deleteProfile"
      > 
        Supprimer
      </button>
    </form>
    <h5 class="fw-bolder mt-3">Tout mes Postes</h5>
    <div class="mes-posts">
      <div class="m-post" v-for="mPost in postsProfile" :key="mPost.id">
        <h3>{{ mPost.title }}</h3>
        <img
          :src="mPost.image"
          :alt="mPost.image"
          v-if="mPost.image != null"
           width="295"
           height="350"
        /><br />
        <p>{{ mPost.content }}</p>
        <deletePost :id="mPost.id" />
       <updatePost :id="mPost.id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import deletePost from "../components/deletePost";
import updatePost from "../components/updatePost";
export default {
  name: "profile",
  components: {
    deletePost,
    updatePost
  },
  props: {
    id: Number,
  },
  data() {
    return {
      token: "",
      error: "",
      userId: "",
      dataProfile: [],
      postsProfile: [],
      email: "",
      name: "",
      firstname: "",
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    loadProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.dataProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    loadPostsProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId + "/posts", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.postsProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    updateProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const data = {
        name: this.name,
        firstname: this.firstname,
      };
      axios
        .put("http://localhost:3000/api/auth/profile/" + userId, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre profil a bien été mis à jour !");
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
    deleteProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .delete("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre compte est supprimé !");
          this.Logout() 
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadProfile();
    this.loadPostsProfile();
  },
};
</script>

<style scoped>
.navbar-expand-lg{
  background-color: #132542;
  color: white;
}

form {
  margin-top: 10px;
}
input {
  margin-bottom: 10px;
}
.btn-light {
  border: none; 
  background-color: #132542;
  cursor: pointer;
}
.btn-danger{
 border: none; 
  cursor: pointer;
  display: inline;
}

.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  color: white solid;
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
.m-post {
  width: 30%;
  max-width: 500px;
  font-size: 12px;
  margin: 15px;
  padding: 10px;
   border: solid 1px;
}
.mes-posts{  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
}
</style>