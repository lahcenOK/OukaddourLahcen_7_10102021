<template>
  <div >
    <div id="post-card" v-for="post in allPosts" :key="post.id">
      <h1 class="title">{{ post.title }}</h1>
      <div class="content">
        <img
          :src="post.image"
          :alt="post.image"
          v-if="post.image != null"
        /><br />
        {{ post.content }}
      </div>
      <div class="createdAt">
        <i>{{ moment(post.createdAt).fromNow() }}</i>
        <i>{{ post.User.name }} {{ post.User.firstname }}</i>
      </div>
      <div>
        <router-link class="one-post" :to="'/onePost/' + post.id"
          >Voir les commentaires</router-link
        >
      </div>
      <div class="adminDelete" v-if="isAdmin == true">
        <deletePost :id="post.id" />
      </div>
    </div>
  </div>
</template>

<script>
import deletePost from "./deletePost";
let moment = require("moment");
let jwt = require("jsonwebtoken");

import axios from "axios";

export default {
  name: "loadPosts",
  components: {
    deletePost,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: "",
      allPosts: [],
      idUsers: "",
      title: "",
      content: "",
      createAt: "",
    };
  },
  methods: {
    loadPosts() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allPosts = res.data;
          this.isAdmin = decodedToken.isAdmin;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  
};
</script>
