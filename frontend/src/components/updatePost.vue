<template>
  <div>
    <button class="btn btn-primary btn-lg" type="submit" @click.prevent="updatePost">modifier post</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "updatePost",
  props: {
    id: Number,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    updatePost() {
      let token = localStorage.getItem("token");
      axios

        .put("http://localhost:3000/api/posts/" + this.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été modifié !");
          document.location.reload();
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>

<style scoped>

</style>
