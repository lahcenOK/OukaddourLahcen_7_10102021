<template>
  <div>
    <form method="post" @submit.prevent="buttonNewComment">
      <div>
        <label for="comment"></label>
        <input
          type="text"
          id="comment"
          placeholder="Commentaire"
          v-model="comment"
        />
      
      <button class=" btn-sm btn btn-primary active" type="submit" @click.prevent="buttonNewComment">
        Envoyer 
      </button>
      </div>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newComment",
  props: {
    id: Number,
  },
  data() {
    return {
      comment: "",
      error: "",
    };
  },
  methods: {
    buttonNewComment() {
      const data = {
        comment: this.comment,
      };
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/posts/" + this.id + "/comment/",
          data,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.push("/onePost/" + this.id);
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style scoped>
input {
  border: solid rgb(206, 206, 206) 1px;
  text-decoration: none;
  box-shadow: 5px 5px 7px #f8432b;
  margin-top: 10px;
  width: 50%;
}
button {
  color: white;
  margin-top:1px;
  border: none;
  
}
.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  color: white solid;
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
</style>