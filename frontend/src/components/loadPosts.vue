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
    loadNavigate() {
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
   mounted() {
    this.loadNavigate();
  },
};
</script>
<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#message-card {
  color: white;
  width: 80%;
  max-width: 500px;
  border: solid 2px;
  margin: 15px;
}
a {
  text-decoration: none;
  color: red;
}
.content {
  font-size: 18px;
  padding-bottom: 15px;
}
img {
  max-width: 500px;
  width: 90%;
  height: 90%;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 15px;
}
.one-message {
  background-color: #c46e78;
  color: white;
  padding: 9px;
  border-radius: 25px;
  font-size: 14px;
}
.adminDelete {
  margin: 30px;
}
</style>