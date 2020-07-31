# Weather-TS :sunny: :umbrella: :cloud:

You can search for real time weather data by ensuring the country code and typing the city name. The application also shows you the average temperature of the next 10 days and forecast for the next 7 days.

## :point_right: [checkout the deployed version here](https://gergokutu-weather.netlify.app) :point_left:

![](weather.gif)

## Notes:

- Application fetches data from https://www.weatherbit.io/ by using free API_KEY
- API_KEY validity date: 26/06/2020
- 1000 API call per day

You can insert your own API_KEY in src/store/index.ts into the loadCityActual & loadCityForecast actions.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
