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
        {{ Math.round(cityInfo.data[0].temp) }} <span>&#8451;</span>
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
  height: 115%;
  top: 0;
  left: 0;
  width: 103%;
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
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

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
    #4fffca91;
  box-shadow: 0px 2px 10px rgba(1, 5, 19, 0.15),
    2px 4px 15px rgba(18, 35, 95, 0.15), 4px 6px 20px rgba(58, 81, 156, 0.15);
  border-radius: 16px;
  position: relative;
  margin-top: 10%;
  left: 27%;
  width: 45%;
  height: auto;
  min-height: 70px;
}

.search-box > div {
  margin: 5px;
  height: 38px;
}

.search-bar {
  background-color: transparent;
  width: 90%;
}

.select-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // align-content: center;
  justify-content: space-evenly;
  text-align: center;
  width: 120px;
  border: 1px solid rgba(8, 21, 62, 0.05);
  border-radius: 6px;
}

.select-box > select {
  border: none;
  background-color: #ffffff;
}

.weather-icon {
  position: relative;
  bottom: 7px;
}

.weather-icon > img {
  height: 140%;
  width: auto;
}

.search-bar-wrapper {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  text-align: center;

  width: 425px;
  border: 1px solid rgba(8, 21, 62, 0.05);
  border-radius: 6px;
}

.search-bar > input {
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  height: 27px;
  width: 85%;
  opacity: 0.4;
  margin-top: 4px;
  padding-left: 2rem;
}

.search-icon {
  margin-top: 1.5%;
  margin-left: 10px;
  opacity: 0.4;
}

h3 {
  opacity: 0.5;
  font-size: 2.5rem;
}

.weather-icon,
.flag,
.select-box {
  opacity: 0.8;
}

.flag {
  margin-top: 1.5%;
}

.select-box {
  margin-top: 3%;
}

.result {
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 600;
  color: #08153e;
}

.actual-temp {
  color: #ffffff;
  font-size: 10rem;
  font-weight: 800;
  position: relative;
  left: 30px;
}

.actual-temp > span {
  position: relative;
  bottom: 80px;
  right: 40px;
  color: #ffffff;
  font-size: 3rem;
  font-weight: 800;
}

.avg {
  color: #e9faf8;
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 1rem;
  position: relative;
  bottom: 20px;
  right: auto;
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
  margin-bottom: 2rem;
  top: 0;
  left: 20%;
  width: 60%;
}

.period {
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0.4;
}

.day-name {
  font-weight: bold;
  opacity: 0.4;
  margin-top: -1.2rem;
  font-size: 1rem;
}

.daily-forecast {
  margin: 20px;
}

.daily-forecast:hover {
  opacity: 0.5;
  cursor: grabbing;
}

.day-temp {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  opacity: 0.5;
}

.back-to-welcome {
  margin-top: 1.5rem;
  padding-bottom: 4rem;
  opacity: 0.6;

  // position: relative;
  // top: 20px;
}
</style>
