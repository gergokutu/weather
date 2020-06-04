<template>
  <div
    :class="zeroSearch === 'true' ? '' : 'weather-result'"
    :style="
      zeroSearch === 'true'
        ? ''
        : `--color: ${colorCodes[chooseColor(actual.data[0].temp)]}`
    "
  >
    <div class="search-box">
      <div class="weather-icon">
        <img
          :src="
            url +
              (zeroSearch === 'true' ? 'c01d' : actual.data[0].weather.icon) +
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
              >{{ item.countryCode }}</option
            >
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
        {{ Math.round(actual.data[0].temp) }}
        <span>&#8451;</span>
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
    <div
      v-else-if="cityInfo === '' && search"
      :class="zeroSearch === 'true' ? '' : 'weather-result'"
    >
      <div class="error-message">
        <span>ERROR:</span>
        <br />You mistyped the <br /><strong>city</strong> <br />and/or chose
        the wrong <br /><strong>country code</strong>!!!
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
    ...mapState(["cityInfo", "countryList", "avgTen", "actual"])
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
  search = false;
  url = `https://www.weatherbit.io/static/img/icons/`;
  extension = `.png`;
  timerIDCounter = 0;
  colorCodes = [
    "#102F7E", // -40
    "#0C8DD6", // -30
    "#1AA0EC", // -20
    "#60C6FF", // -10
    "#9BDBFF", // 0
    "#B4DEDA", // 10
    "#FFD66B", // 20
    "#FFC178", // 30
    "#FE9255" // 40
  ];

  get flagURL() {
    return `https://www.countryflags.io/${this.countryCode}/shiny/32.png`;
  }

  chooseColor = (temp: number) => {
    if (temp < -39) return 0;
    if (temp < -29) return 1;
    if (temp < -19) return 2;
    if (temp < -9) return 3;
    if (temp < 1) return 4;
    if (temp < 11) return 5;
    if (temp < 21) return 6;
    if (temp < 31) return 7;
    if (temp >= 31) return 8;
  };

  clearAllIntervals = () => {
    const nextID = setInterval(() => console.log("timerID:", nextID), 1000);
    for (let i = 1; i <= nextID; i++) {
      clearInterval(i);
    }
  };

  fetchWeather(event: any, search: boolean) {
    const city: string = this.queryCity;
    const code: string = this.countryCode;

    if (event.key == "Enter") {
      if (this.timerIDCounter > 0) {
        this.clearAllIntervals();
      }
      this.timerIDCounter++;

      this.$store.dispatch("loadCityForecast", { city, code });
      this.$store.dispatch("loadCityActual", { city, code });
      // API refreshed every 5 mins > 300000ms
      setInterval(() => {
        this.$store.dispatch("loadCityActual", { city, code });
      }, 300000);

      this.queryCity = "";
      this.zeroSearch = "false";

      this.search = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
$colorByTemp: var(--color);

.weather-result {
  width: 100%;
  height: auto;
  padding-top: 2rem;
  padding-bottom: 23rem;
  background: linear-gradient(
    145.74deg,
    #9bdbff -33.02%,
    #b4deda 52.01%,
    $colorByTemp 137.04%
  );
  background-position: center center;
  background-repeat: repeat;
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
    #f8f8f8;
  box-shadow: 0px 2px 10px rgba(8, 21, 62, 0.15);
  border-radius: 16px;
  position: relative;
  left: 25%;
  width: 50%;
  height: auto;
  min-height: 50px;
  max-height: auto;
  margin-top: 100px;
}

.search-box > div {
  margin: 5px;
  height: 38px;
}

.select-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
  width: 120px;
  border: 1px solid rgba(8, 21, 62, 0.05);
  border-radius: 6px;
}

.select-box > select {
  border: none;
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

.search-bar {
  background-color: transparent;
  width: 90%;
}

.search-bar > input {
  outline: none;
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  height: 27px;
  width: 85%;
  opacity: 0.9;
  margin-top: 4px;
  padding-left: 2rem;
  border: 2px solid #b5c7ff;
  border-radius: 6px;
}

.search-bar > input:placeholder-shown {
  opacity: 0.4;
  border: 1px solid rgba(8, 21, 62, 0.05);
}

.search-bar > input:hover {
  border: 1px solid #b5c7ff;
}

.search-icon {
  margin-top: 1.5%;
  margin-left: 10px;
  opacity: 0.4;
}

h3 {
  opacity: 0.4;
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
  text-align: center;
  padding-left: 40px;
}

.actual-temp > span {
  position: relative;
  bottom: 90px;
  right: 40px;
  color: #ffffff;
  font-size: 2rem;
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
  margin-top: 23rem;
  padding-bottom: 4rem;
  opacity: 0.6;
}

.error-message {
  color: rgba(255, 0, 0, 0.9);
  opacity: 0.7;
  font-size: 1rem;
  margin-top: 5rem;
  position: absolute;
  left: 25%;
  width: 50%;
}

.error-message > span {
  font-size: 1.5rem;
}
</style>
