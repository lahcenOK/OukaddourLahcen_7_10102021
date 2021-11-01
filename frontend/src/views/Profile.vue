<template>
  <div>
    <nav id="nav">
      <ul class="links">
        <li>
          <router-link to="/navigate">Retour</router-link>
        </li>
      </ul>
    </nav>
    <div>
    <h2>Profile</h2>
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
      <button class="btn btn-primary btn-lg" type="submit" @click.prevent="updateProfile">Modifier</button>
    
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
    <button class="deletebtn btn-danger" type="submit" @click.prevent="deleteProfile">
      Supprimer mon compte
    </button></form>
    <h4>Tout mes Postes</h4>
    <div>
      <newPost/>
    </div>
         <div class="my-posts">
      <div
        class="m-post"
        v-for="mPost in postsProfile"
        :key="mPost.id"
      >
        <h3>{{ mPost.title }}</h3>
        <img
          :src="mPost.image"
          :alt="mPost.image"
          v-if="mPost.image != null"
        /><br />
        <p>{{ mPost.content }}</p>
        <deletePost :id="mPost.id" />
      </div>
    </div>
    
     </div>
</template>

<script>
import axios from "axios";
import deletePost from "../components/deletePost";
export default {
  name:"profile",
  components: {
    deletePost,
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
      email: "",
      name: "",
      firstname: "",
    };
  },
  methods: {
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
          this.$router.push("/");
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
form {
  margin-top: 10px;
}
input {
  margin-bottom: 10px;
}
.deletebtn {
  background-color: rgb(255, 80, 80);
  margin-top: 10px;
  margin-bottom: 40px;
  height: 45px;
}
.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  color: white solid;
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
</style>