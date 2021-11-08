<template>
  <div class="poster" >
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
        <router-link class="btn text-light" :to="'/onePost/' + post.id"
          >Voir les commentaires</router-link
        >
        </div>
      <div class="adminDelete" v-if="isAdmin == true">
        <deletePost :id="post.id" />
      </div>
      <div class="adminDelete" v-else-if="post.idUsers == userId">
          <deletePost :id="post.id" />
        </div>
    </div>
  </div>
</template>

<script>
import deletePost from "./deletePost";
let moment = require("moment");

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

      axios
        .get("http://localhost:3000/api/posts/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allPosts = res.data;
          this.isAdmin = this.$store.getters.isAdmin;
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
.poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
}
#post-card {
  width: 80%;
  max-width: 500px;
  border: solid 1px;
  margin: 10px;
}

.btn {
  background-color: #132542;
  cursor: pointer;
  }

.content {
  font-size: 18px;
  padding-bottom: 5px;

}
img {
  max-width: 500px;
  width: 80%;
  height: 60%;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 15px;
}
.one-post {
  background-color: rgb(255, 110, 110);
  color: white;
  padding: 9px;
  border-radius: 25px;
  font-size: 14px;
}
.adminDelete {
  margin: 10px;
}
</style>