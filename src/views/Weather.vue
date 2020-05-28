<template>
  <div class="weather">
    <div class="search-box">
      <div class="weather-icon">
        {{ cityInfo && cityInfo.data[0].weather.icon }}
      </div>

      <img :src="url + (queryCity === '' ? 'c01d' : 'c03d') + extension" />
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
    </div>

    <div class="result" v-if="typeof cityInfo.city_name === 'string'">
      <h3 class="city-name">{{ cityInfo.city_name }}</h3>

      <div class="actual-temp">
        Actual temp: {{ Math.round(cityInfo.data[0].temp) }} &#8451;
      </div>

      <div class="forecast">
        <div class="avg">
          Avg of next 10 days:
          {{
            Math.round(
              cityInfo.data
                .map(day => day.temp)
                .slice(1, 11)
                .reduce((acc, curr) => acc + curr) /
                cityInfo.data.slice(1, 11).length
            )
          }}
          &#8451;
        </div>

        <div class="next-seven-days-block">
          Next 7 days forecast:
          <div
            class="daily-forecast"
            v-for="(day, index) in cityInfo.data.slice(1, 8)"
            :key="index"
          >
            <div>
              {{ week[new Date(day.valid_date).getDay()] }}
            </div>
            <div>{{ Math.round(day.temp) }} &#8451;</div>
          </div>
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
  week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  url = `https://www.weatherbit.io/static/img/icons/`;
  code = `c02d`;
  extension = `.png`;

  get flagURL() {
    return `https://www.countryflags.io/${this.countryCode}/shiny/32.png`;
  }

  fetchWeather(event: any) {
    const city = this.queryCity;
    const code = this.countryCode;

    if (event.key == "Enter") {
      this.$store.dispatch("loadCity", { city, code });
      this.queryCity = "";
    }
  }
}
</script>

<style lang="scss">
.weather-icon {
  background-image: url("https://www.weatherbit.io/static/img/icons/c02d.png");
}
</style>
