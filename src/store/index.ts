import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    cityInfo: "something to fetch"
  },

  mutations: {
    SET_POSTS(state, city) {
      state.cityInfo = city;
    }
  },

  actions: {
    loadPosts({ commit }, { test, age }) {
      console.log(`${test} and ${age}`);
      const API_KEY = "27612018b6ba443f89d194a31acfea3b";
      const requestedCity = "Amsterdam";
      const country = "NL";
      axios
        .get(
          `https://api.weatherbit.io/v2.0/current?city=${requestedCity}&country=${country}&key=${API_KEY}`
        )
        .then(response => {
          console.log("from API:", response.data.data[0]);
          const city = response.data.data[0];
          commit("SET_POSTS", city);
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
