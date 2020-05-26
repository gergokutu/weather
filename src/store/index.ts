import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    posts: ["something to fetch"]
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    loadPosts({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
          console.log("from API:", response.data);
          const posts = response.data;
          commit("SET_POSTS", posts);
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
