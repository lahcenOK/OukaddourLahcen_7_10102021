<template>
  <div>
    <button type="submit" @click.prevent="deleteComment"><i class="fas fa-trash-alt"></i></button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "deleteComment",
  props: {
    idComm: Number,
  },
  data() {
    return {
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
    };
  },
  methods: {
    deleteComment() {
      let token = localStorage.getItem("token");
      axios
        .delete(
          "http://localhost:3000/api/posts/" +
            this.id +
            "/comment/" +
            this.idComm,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          alert("Votre commentaire a bien été supprimé !");
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
button {
  background-color: rgb(200, 193, 193);
  color: white;
  border: none;
  padding: 5px;
  margin-top: 10px;
}
</style>