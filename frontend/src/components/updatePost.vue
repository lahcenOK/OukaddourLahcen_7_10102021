<template>
  <div class="container justify-content-center">
    <form method="post" @submit.prevent="buttonUpdatePost">
      <h4 class="fw-bolder mt-5">Poster votre message :</h4>
      <div>
        <label for="title"></label>
        <input
          class="form-control"
          type="title"
          id="title"
          placeholder="Titre"
          v-model="title"
        />
      </div>
      <div>
        <label for="content"></label>
        <textarea
          type="text"
          id="content"
          placeholder="Votre message !"
          rows="3"
          class="form-control col-sm-6"
          v-model="content"
        />
      </div>
      <img :src="image" v-if="image != ''" /><br />
      <div>
        <label for="File">(Optionnel)</label><br />
        <input
          class="form-control"
          id="fileInput"
          type="file"
          ref="file"
          @change="selectFile()"
        />
      </div>
      <button
        class="btn active ms-2 text-light"
        type="submit"
        @click.prevent="buttonUpdatePost"
      >
        Publier
      </button>
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "updatePost",
  data() {
    return {
      title: "",
      content: "",
      file: null,
      image: "",
      error: "",
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
      userId: localStorage.getItem("id"),
    };
  },
  methods: {
    getPost() {
     let token = localStorage.getItem("token");

      axios
        .get("http://localhost:3000/api/posts/" + this.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.isAdmin = this.$store.getters.isAdmin;
          this.title = res.data.title;
          this.content = res.data.content;
          this.image = res.data.image;
      
          console.log(res.data);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    buttonUpdatePost() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      if (
        this.file !== null &&
        document.getElementById("fileInput").value != ""
      ) {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("id", this.id);
        data.append("image", this.file, this.file.name);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("id", this.id);
      }

      axios
        .put("http://localhost:3000/api/posts/modif", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été Mis à jour !");

          document.getElementById("fileInput").value = "";

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
  mounted() {
    this.getPost();
  },
};
</script>


<style scoped>
textarea {
  margin: auto;
  width: 70%;
}
label {
  font-size: 12px;
}
input {
  margin: auto;
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

img {
  max-width: 200px;
  width: 80%;
  height: 60%;
}
.error {
  font-size: 17px;
  background-color: rgb(255, 110, 110, 1);
  color: white solid;
  margin: 20px 280px 20px 280px;
  padding: 10px;
}
</style>