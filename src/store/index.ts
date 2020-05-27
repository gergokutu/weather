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
    loadPosts({ commit }, { test, age }) {
      console.log(`${test} and ${age}`);
      const API_KEY = "27612018b6ba443f89d194a31acfea3b";
      const requestedCity = "Amsterdam,NL";
      axios
        .get(
          `https://api.weatherbit.io/v2.0/current?city=${requestedCity}&key=${API_KEY}`
        )
        .then(response => {
          console.log("from API:", response.data.data[0]);
          const posts = response.data.data[0].city_name;
          commit("SET_POSTS", posts);
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
