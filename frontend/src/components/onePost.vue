<template>
  <div>
    <nav id="nav">
      <ul class="links">
        <li>
          <router-link to="/feed">Retour</router-link>
        </li>
      </ul>
    </nav>
    <div id="onePost">
      <div id="comment-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">
          <i class="user-name"
            >{{ comment.User.name }} {{ comment.User.firstname }}</i
          ><br />
          <strong>{{ comment.comment }}</strong><br />
          <i class="date">{{ moment(comment.createdAt).fromNow() }}</i>
        </div>
        <div v-if="comment.idUsers == userId">
          <deleteComment :idComm="comment.id" />
        </div>
        <div v-if="isAdmin == true">
          <deleteComment :idComm="comment.id" />
        </div>
      </div>
    </div>
    <div class="commentaire">
      <newComment :id="id" />
    </div>
  </div>
</template>


<script>
let moment = require("moment");
import newComment from "./newComment";
import deleteComment from "./deleteComment";
let jwt = require("jsonwebtoken");

import axios from "axios";

export default {
  name: "onePost",
  components: {
    deleteComment,
    newComment,
  },
  data() {
    return {
      moment: moment,
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
      userId: localStorage.getItem("id"),
      allComments: [],
    };
  },
  methods: {
    loadComments() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      axios
        .get("http://localhost:3000/api/posts/" + this.id + "/comments/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.isAdmin = decodedToken.isAdmin;
          this.allComments = res.data;
          console.log(this.allComments)
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadComments();
  },
};
</script>
<style scoped>
#oneMessage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
#comment-card {
  background-color: #c46e78;
  color: white;
  font-size: 15px;
  width: 80%;
  border: solid 2px;
  margin-bottom: 15px;
  padding: 15px;
  text-align: left;
}
.user-name {
  font-size: 11px;
}
.date {
  font-size: 12px;
}
.comment {
  font-size: 20px;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 15px;
}
.commentaire {
  margin: 15px;
}
</style>