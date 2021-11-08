import { createStore } from 'vuex'

let jwt = require("jsonwebtoken");

export default createStore({  
  state: {
    Admin: 'false',    
  },
  getters: {
    isAdmin: (state) => {
      let decodedToken = jwt.verify(localStorage.getItem("token"), process.env.VUE_APP_TOKEN);
      state.Admin = decodedToken.isAdmin;
      return state.Admin;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})