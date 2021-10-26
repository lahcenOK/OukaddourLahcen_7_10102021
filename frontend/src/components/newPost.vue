<template>
<div class="container justify-content-center">
    <img
      class="mb-4"
      src="../assets/icon-logo.png"
      alt=""
      width=""
      height="60"
    />
    <form method="post" @submit.prevent="buttonNewPost">
      <h2>Poster votre message : </h2>
      <div>
        <label for="title"></label>
        <input type="title" id="title" placeholder="Titre" v-model="title" />
      </div>
      <div>
        <label for="content"></label>
        <textarea 
          type="text"
          id="content"
          placeholder="Votre message !"
          rows="3" class="form-group form-group col-sm-6"
          v-model="content"
        />
      </div>
      <div>
        <label for="File">(Facultatif)</label><br />
        <input type="file" ref="file" @change="selectFile()" />
      </div>
      <button class="  btn btn-primary active" type="submit" @click.prevent="buttonNewMessage">Publier</button>
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newPost",
  data() {
    return {
      title: "",
      content: "",
      file: null,
      error: "",
    };
  },
  methods: {
    buttonNewPost() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      if (this.file !== null) {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("image", this.file, this.file.name);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
      }
      axios
        .post("http://localhost:3000/api/posts/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été publié !");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped>

textarea {
  width: 50%;
  margin-bottom: 1px;
}
label {
  font-size: 12px;
}
input {
  border: solid rgb(172, 164, 164) 1px;
  text-decoration: none;
  margin-bottom: 5px;
  width: 50%;
}
button {
  border-radius: 0.3rem;
  width: 50%;
  height: 30%;
  font-weight: 600;
  margin-top: 1px;
  cursor: pointer;
}

.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  color: white solid;
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
</style>