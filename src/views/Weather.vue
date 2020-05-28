<template>
  <div class="weather">
    <div class="search-box">
      <!-- <img :src="flagURL" /> -->
      <img :src="flagURL" />
      <div class="select-box">
        <select v-model="countryCode">
          <option
            v-for="(item, index) in countryList"
            :key="index"
            :value="item.countryCode"
          >
            {{ item.countryCode }}
          </option>
        </select>
      </div>

      <div class="search-bar">
        <input
          type="text"
          class="search-bar"
          placeholder="Please enter your location..."
          v-model="queryCity"
          @keypress="fetchWeather"
        />
      </div>

      <div class="result" v-if="cityInfo.city_name !== undefined">
        <!-- <h3 class="city-name">{{ cityInfo.city_name }}</h3> -->
        <div class="actual-temp">
          {{ Math.round(cityInfo.data[0].temp) }} &#8451;
        </div>
        <div class="avg-10">
          {{ Math.round(cityInfo.data[1].temp) }} &#8451;
        </div>
        <!-- <div class="date-time">{{ cityInfo.datetime }}</div> -->
        <div class="forecast">
          {{ cityInfo.data.map(day => day.temp).slice(1, 11) }}
        </div>
        <div class="forecast">
          {{
            cityInfo.data
              .map(day => day.temp)
              .slice(1, 11)
              .reduce((acc, curr) => acc + curr) /
              cityInfo.data.slice(1, 11).length
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState(["cityInfo", "countryList", "avgTen"])
  }
})
export default class Weather extends Vue {
  queryCity = "";
  countryCode = "NL";

  get flagURL() {
    return `https://www.countryflags.io/${this.countryCode}/shiny/32.png`;
  }

  fetchWeather(event: any) {
    const city = this.queryCity;
    const code = this.countryCode;

    if (event.key == "Enter" && city !== "") {
      this.$store.dispatch("loadCity", { city, code });
    }
  }
}
</script>
