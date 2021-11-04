<template>
<div class="container justify-content-center">
      <form method="post" @submit.prevent="buttonNewPost">
        
      <h4 class="fw-bolder mt-5" >Poster votre message : </h4>
      <div>
        <label for="title"></label>
        <input class="form-control" type="title" id="title" placeholder="Titre" v-model="title" />
      </div>
      <div>
        <label for="content"></label>
        <textarea 
          type="text"
          id="content"
          placeholder="Votre message !"
          rows="3" class="form-control col-sm-6"
          v-model="content"
        />
      </div>
      <div>
        <label for="File">(Optionnel)</label><br />
        <input class="form-control" type="file" ref="file" @change="selectFile()" />
      </div>
      <button class="btn active ms-2 text-light" type="submit" @click.prevent="buttonNewPost">Publier</button>
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

          document.location.reload();
          this.$router.push("/navigate");

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
  margin:auto;
  width: 70%;
}
label {
  font-size: 12px;
}
input {
 margin:auto;
  margin-bottom: 4px;
  width: 70%;
}
button {
  border-radius: 0.3rem;
  width: 70%;
  height: 30%;
  font-weight: 600;
  background-color: #132542;
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