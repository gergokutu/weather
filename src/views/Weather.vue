<template>
  <div :class="zeroSearch === 'true' ? 'weather-search' : 'weather-result'">
    <div class="search-box">
      <div class="weather-icon">
        <img
          :src="
            url +
              (zeroSearch === 'true' ? 'c01d' : cityInfo.data[0].weather.icon) +
              extension
          "
        />
      </div>

      <div class="select-wrapper">
        <div class="flag">
          <img :src="flagURL" />
        </div>

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
      </div>

      <div class="search-bar-wrapper">
        <div class="search-bar">
          <input
            type="text"
            class="search-bar"
            placeholder="Please enter your location..."
            v-model="queryCity"
            @keypress="fetchWeather"
          />
        </div>

        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>

    <div class="result" v-if="cityInfo !== ''">
      <h3 class="city-name">{{ cityInfo.city_name }}</h3>

      <div class="actual-temp">
        {{ Math.round(cityInfo.data[0].temp) }} &#8451;
      </div>

      <div class="forecast">
        <div class="avg">
          (Avg of next 10 days:
          {{
            Math.round(
              cityInfo.data
                .map(day => day.temp)
                .slice(1, 11)
                .reduce((acc, curr) => acc + curr) /
                cityInfo.data.slice(1, 11).length
            )
          }}
          &#8451;)
        </div>

        <div class="next-seven-days-block">
          <div class="period">
            {{ new Date(cityInfo.data[1].valid_date).getDate() }}
            -
            {{ new Date(cityInfo.data[7].valid_date).getDate() }}
            {{ month[new Date(cityInfo.data[7].valid_date).getMonth()] }}
            {{ new Date(cityInfo.data[7].valid_date).getFullYear() }}
          </div>

          <div class="daily-wrapper">
            <div
              class="daily-forecast"
              v-for="(day, index) in cityInfo.data.slice(1, 8)"
              :key="index"
            >
              <div class="day-name">
                {{ week[new Date(day.valid_date).getDay()] }}
              </div>
              <div class="day-temp">{{ Math.round(day.temp) }} &#8451;</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="back-to-welcome">
      <router-link to="/">Back to Welcome</router-link>
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
  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augustus",
    "September",
    "October",
    "November",
    "December"
  ];
  zeroSearch = "true";
  endColor = "$colorByTemp: #FFD66B";

  url = `https://www.weatherbit.io/static/img/icons/`;
  // code = `c02d`;
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
      this.zeroSearch = "false";
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.search-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;

  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #f8f8f8;
  box-shadow: 0px 2px 10px rgba(8, 21, 62, 0.15);
  border-radius: 16px;

  position: relative;
  margin-top: 10%;
  margin-bottom: 5%;
  left: 30%;
  width: 40%;
  height: 92px;
}

.search-box > div {
  margin: 5px;
  height: 35px;
}

.select-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // align-content: center;
  justify-content: center;
  text-align: center;
  width: 80px;
  border: 1px solid rgba(8, 21, 62, 0.05);
  border-radius: 6px;
}

.select-box > select {
  border: none;
  background-color: #ffffff;
}

.weather-icon > img {
  height: 100%;
  width: auto;
}

.search-bar-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  text-align: start;

  width: 425px;
  border: 1px solid rgba(8, 21, 62, 0.05);
  border-radius: 6px;
}

.search-bar > input {
  border: none;
  height: 30px;
  width: 375px;
}

h3 {
  margin-bottom: 30px;
  opacity: 0.6;
  font-size: 2rem;
}

.weather-search {
  width: 100%;
  padding-bottom: 4rem;
  margin: 0rem;
  margin-right: 2rem;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    linear-gradient(
      133.86deg,
      #102f7e -11.47%,
      #0c8dd6 3.95%,
      #1aa0ec 19.37%,
      #60c6ff 34.78%,
      #9bdbff 50.19%,
      #b4deda 65.61%,
      #ffd66b 81.02%,
      #ffc178 96.44%,
      #fe9255 111.85%
    );
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.weather-result {
  position: absolute;
  height: auto;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  margin-right: 2rem;

  $colorByTemp: #ffd66b;
  background: linear-gradient(
    145.74deg,
    #9bdbff -33.02%,
    #b4deda 52.01%,
    $colorByTemp 137.04%
  );
  background-position: center center;
  background-repeat: repeat;
  background-attachment: scroll;
  background-size: cover;
}

.weather-icon,
.flag,
.select-box {
  opacity: 1;
}

.result {
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 600;
  color: #08153e;
}

.actual-temp {
  color: #ffffff;
  font-size: 4rem;
  font-weight: 600;
}

.avg {
  color: #ffffff;
  font-weight: 600;
  opacity: 0.6;
}

.next-seven-days-block {
  box-sizing: border-box;
  padding: 2rem;
}

.daily-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  text-align: start;

  position: relative;
  margin-top: 20px;
  margin-bottom: 5%;
  left: 25%;
  width: 50%;
}

.period {
  margin-top: 50px;
  font-weight: bold;
  opacity: 0.6;
}

.day-name {
  font-weight: bold;
  opacity: 0.6;
}

.day-temp {
  color: #ffffff;
  font-weight: 600;
}

.back-to-welcome {
  margin-bottom: 2rem;
  padding-bottom: 7rem;
}
</style>
