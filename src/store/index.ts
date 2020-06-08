import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    cityInfo: "",
    actual: "",
    countryList: [
      { countryCode: "AD", countryName: "Andorra" },
      { countryCode: "AE", countryName: "United Arab Emirates" },
      { countryCode: "AF", countryName: "Afghanistan" },
      { countryCode: "AG", countryName: "Antigua and Barbuda" },
      { countryCode: "AI", countryName: "Anguilla" },
      { countryCode: "AL", countryName: "Albania" },
      { countryCode: "AM", countryName: "Armenia" },
      { countryCode: "AO", countryName: "Angola" },
      { countryCode: "AQ", countryName: "Antarctica" },
      { countryCode: "AR", countryName: "Argentina" },
      { countryCode: "AS", countryName: null },
      { countryCode: "AT", countryName: "Austria" },
      { countryCode: "AU", countryName: "Heard Island and McDonald Islands" },
      { countryCode: "AW", countryName: "Aruba" },
      { countryCode: "AX", countryName: null },
      { countryCode: "AZ", countryName: "Azerbaijan" },
      { countryCode: "BA", countryName: "Bosnia and Herzegovina" },
      { countryCode: "BB", countryName: "Barbados" },
      { countryCode: "BD", countryName: "Bangladesh" },
      { countryCode: "BE", countryName: "Belgium" },
      { countryCode: "BF", countryName: "Burkina Faso" },
      { countryCode: "BG", countryName: "Bulgaria" },
      { countryCode: "BH", countryName: "Bahrain" },
      { countryCode: "BI", countryName: "Burundi" },
      { countryCode: "BJ", countryName: "Benin" },
      { countryCode: "BL", countryName: null },
      { countryCode: "BM", countryName: "Bermuda" },
      { countryCode: "BN", countryName: "Brunei" },
      { countryCode: "BO", countryName: "Bolivia" },
      { countryCode: "BQ", countryName: null },
      { countryCode: "BR", countryName: "Brazil" },
      { countryCode: "BS", countryName: "Bahamas, The" },
      { countryCode: "BT", countryName: "Bhutan" },
      { countryCode: "BW", countryName: "Botswana" },
      { countryCode: "BY", countryName: "Belarus" },
      { countryCode: "BZ", countryName: "Belize" },
      { countryCode: "CA", countryName: "Canada" },
      { countryCode: "CC", countryName: "Cocos (Keeling) Islands" },
      { countryCode: "CD", countryName: "Congo, Democratic Republic of The" },
      { countryCode: "CF", countryName: "Central African Republic" },
      { countryCode: "CG", countryName: "Congo" },
      { countryCode: "CH", countryName: "Switzerland" },
      { countryCode: "CI", countryName: "Côte dʼIvoire" },
      { countryCode: "CK", countryName: "Cook Islands" },
      { countryCode: "CL", countryName: "Chile" },
      { countryCode: "CM", countryName: "Cameroon" },
      { countryCode: "CN", countryName: "Paracel Islands" },
      { countryCode: "CO", countryName: "Colombia" },
      { countryCode: "CR", countryName: "Costa Rica" },
      { countryCode: "CU", countryName: "Cuba" },
      { countryCode: "CV", countryName: "Cape Verde" },
      { countryCode: "CW", countryName: null },
      { countryCode: "CX", countryName: "Christmas Island" },
      { countryCode: "CY", countryName: "Cyprus" },
      { countryCode: "CZ", countryName: "Czech Republic" },
      { countryCode: "DE", countryName: "Germany" },
      { countryCode: "DJ", countryName: "Djibouti" },
      { countryCode: "DK", countryName: null },
      { countryCode: "DM", countryName: "Dominica" },
      { countryCode: "DO", countryName: "Dominican Republic" },
      { countryCode: "DZ", countryName: "Algeria" },
      { countryCode: "EC", countryName: "Ecuador" },
      { countryCode: "EE", countryName: "Estonia" },
      { countryCode: "EG", countryName: "Egypt" },
      { countryCode: "EH", countryName: "Western Sahara" },
      { countryCode: "ER", countryName: "Eritrea" },
      { countryCode: "ES", countryName: "Ceuta" },
      { countryCode: "ET", countryName: "Ethiopia" },
      { countryCode: "FI", countryName: "Finland" },
      { countryCode: "FJ", countryName: "Fiji" },
      { countryCode: "FK", countryName: "Falkland Islands (Islas Malvinas)" },
      { countryCode: "FM", countryName: "Micronesia, Federated States of" },
      { countryCode: "FO", countryName: "Faroe Islands" },
      { countryCode: "FR", countryName: "France" },
      { countryCode: "GA", countryName: "Gabon" },
      { countryCode: "GB", countryName: null },
      { countryCode: "GD", countryName: "Grenada" },
      { countryCode: "GE", countryName: "Abkhazia" },
      { countryCode: "GF", countryName: null },
      { countryCode: "GG", countryName: "Guernsey" },
      { countryCode: "GH", countryName: "Ghana" },
      { countryCode: "GI", countryName: "Gibraltar" },
      { countryCode: "GL", countryName: "Greenland" },
      { countryCode: "GM", countryName: "Gambia, The" },
      { countryCode: "GN", countryName: "Guinea" },
      { countryCode: "GP", countryName: null },
      { countryCode: "GQ", countryName: "Equatorial Guinea" },
      { countryCode: "GR", countryName: "Piraiós Nomós" },
      {
        countryCode: "GS",
        countryName: "South Georgia and The South Sandwich Islands"
      },
      { countryCode: "GT", countryName: "Guatemala" },
      { countryCode: "GU", countryName: null },
      { countryCode: "GW", countryName: "Guinea-Bissau" },
      { countryCode: "GY", countryName: "Guyana" },
      { countryCode: "HK", countryName: "Hong Kong" },
      { countryCode: "HN", countryName: "Honduras" },
      { countryCode: "HR", countryName: "Croatia" },
      { countryCode: "HT", countryName: "Haiti" },
      { countryCode: "HU", countryName: "Hungary" },
      { countryCode: "ID", countryName: "Indonesia" },
      { countryCode: "IE", countryName: "Ireland" },
      { countryCode: "IL", countryName: "Israel" },
      { countryCode: "IM", countryName: "Isle of Man" },
      { countryCode: "IN", countryName: "India" },
      { countryCode: "IQ", countryName: "Iraq" },
      { countryCode: "IR", countryName: "Iran" },
      { countryCode: "IS", countryName: "Iceland" },
      { countryCode: "IT", countryName: "Italy" },
      { countryCode: "JE", countryName: null },
      { countryCode: "JM", countryName: "Jamaica" },
      { countryCode: "JO", countryName: "Jordan" },
      { countryCode: "JP", countryName: "Japan" },
      { countryCode: "KE", countryName: "Kenya" },
      { countryCode: "KG", countryName: "Kyrgyzstan" },
      { countryCode: "KH", countryName: "Khétt Bântéay Méan Cheăy" },
      { countryCode: "KI", countryName: "Line Islands" },
      { countryCode: "KM", countryName: "Comoros" },
      { countryCode: "KN", countryName: "Saint Kitts and Nevis" },
      { countryCode: "KP", countryName: "North Korea" },
      { countryCode: "KR", countryName: "South Korea" },
      { countryCode: "KW", countryName: "Muḩāfaz̧atalWafrah" },
      { countryCode: "KY", countryName: "Cayman Islands" },
      { countryCode: "KZ", countryName: "Zhezqazghan Oblysy" },
      { countryCode: "LA", countryName: "Laos" },
      { countryCode: "LB", countryName: "Lebanon" },
      { countryCode: "LC", countryName: "Saint Lucia" },
      { countryCode: "LI", countryName: "Liechtenstein" },
      { countryCode: "LK", countryName: "Sri Lanka" },
      { countryCode: "LR", countryName: "Liberia" },
      { countryCode: "LS", countryName: "Lesotho" },
      { countryCode: "LT", countryName: "Lithuania" },
      { countryCode: "LU", countryName: "Luxembourg" },
      { countryCode: "LV", countryName: "Dobeles Rajons" },
      { countryCode: "LY", countryName: "Libya" },
      { countryCode: "MA", countryName: null },
      { countryCode: "MC", countryName: "Monaco" },
      { countryCode: "MD", countryName: "Ungheni Judetul" },
      { countryCode: "ME", countryName: "Montenegro" },
      { countryCode: "MF", countryName: null },
      { countryCode: "MG", countryName: "Madagascar" },
      { countryCode: "MH", countryName: "Marshall Islands" },
      {
        countryCode: "MK",
        countryName: "Macedonia, The Former Yugoslav Republic of"
      },
      { countryCode: "ML", countryName: "Mali" },
      { countryCode: "MM", countryName: "Burma" },
      { countryCode: "MN", countryName: "Erdenet Hot (historical)" },
      { countryCode: "MO", countryName: "Macau" },
      { countryCode: "MP", countryName: null },
      { countryCode: "MQ", countryName: null },
      { countryCode: "MR", countryName: "Nouakchott District de" },
      { countryCode: "MS", countryName: "Montserrat" },
      { countryCode: "MT", countryName: "Malta" },
      { countryCode: "MU", countryName: "Mauritius" },
      { countryCode: "MV", countryName: "Maale" },
      { countryCode: "MW", countryName: "Malawi" },
      { countryCode: "MX", countryName: "Mexico" },
      { countryCode: "MY", countryName: "Malaysia" },
      { countryCode: "MZ", countryName: "Mozambique" },
      { countryCode: "NA", countryName: "Namibia" },
      { countryCode: "NC", countryName: null },
      { countryCode: "NE", countryName: "Niger" },
      { countryCode: "NF", countryName: "Norfolk Island" },
      { countryCode: "NG", countryName: "Bendel State" },
      { countryCode: "NI", countryName: "Nicaragua" },
      { countryCode: "NL", countryName: "Netherlands" },
      { countryCode: "NO", countryName: "Jan Mayen" },
      { countryCode: "NP", countryName: "Bāgmatī Zone" },
      { countryCode: "NR", countryName: "Nauru" },
      { countryCode: "NU", countryName: "Niue" },
      { countryCode: "NZ", countryName: "Chatham Islands" },
      { countryCode: "OM", countryName: "Oman" },
      { countryCode: "PA", countryName: "Panama" },
      { countryCode: "PE", countryName: "Peru" },
      { countryCode: "PF", countryName: null },
      { countryCode: "PG", countryName: "Papua New Guinea" },
      { countryCode: "PH", countryName: "Philippines" },
      { countryCode: "PK", countryName: "Pakistan" },
      { countryCode: "PL", countryName: null },
      { countryCode: "PM", countryName: null },
      { countryCode: "PN", countryName: "Pitcairn Islands" },
      { countryCode: "PR", countryName: null },
      { countryCode: "PS", countryName: "Palestine" },
      { countryCode: "PT", countryName: "Portugal" },
      { countryCode: "PW", countryName: "Palau" },
      { countryCode: "PY", countryName: "Paraguay" },
      { countryCode: "QA", countryName: "Qatar" },
      { countryCode: "RE", countryName: null },
      { countryCode: "RO", countryName: null },
      { countryCode: "RS", countryName: "Serbia" },
      { countryCode: "RU", countryName: "Russia" },
      { countryCode: "RW", countryName: "Rwanda" },
      { countryCode: "SA", countryName: "Saudi Arabia" },
      { countryCode: "SB", countryName: "Makira Province" },
      { countryCode: "SC", countryName: "Seychelles" },
      { countryCode: "SD", countryName: "Sudan" },
      { countryCode: "SE", countryName: "Sweden" },
      { countryCode: "SG", countryName: "Singapore" },
      { countryCode: "SH", countryName: "Saint Helena" },
      { countryCode: "SI", countryName: "Občina [historical] Hodoš Šalovci" },
      { countryCode: "SJ", countryName: null },
      { countryCode: "SK", countryName: "Slovakia" },
      { countryCode: "SL", countryName: "Sierra Leone" },
      { countryCode: "SM", countryName: "San Marino" },
      { countryCode: "SN", countryName: "Senegal" },
      { countryCode: "SO", countryName: "Somalia" },
      { countryCode: "SR", countryName: "Suriname" },
      { countryCode: "SS", countryName: null },
      { countryCode: "ST", countryName: "Príncipe" },
      { countryCode: "SV", countryName: "El Salvador" },
      { countryCode: "SX", countryName: null },
      { countryCode: "SY", countryName: "Syria" },
      { countryCode: "SZ", countryName: "Swaziland" },
      { countryCode: "TC", countryName: "Turks and Caicos Islands" },
      { countryCode: "TD", countryName: "Chad" },
      { countryCode: "TF", countryName: null },
      { countryCode: "TG", countryName: "Togo" },
      { countryCode: "TH", countryName: "Thailand" },
      { countryCode: "TJ", countryName: "Kulyabskaya Oblast'" },
      { countryCode: "TK", countryName: "Tokelau" },
      { countryCode: "TL", countryName: "Bobonaro" },
      { countryCode: "TM", countryName: "Turkmenistan" },
      { countryCode: "TN", countryName: "Tunis al Janubiyah Wilayat" },
      { countryCode: "TO", countryName: "Tonga" },
      { countryCode: "TR", countryName: "Turkey" },
      { countryCode: "TT", countryName: "Trinidad and Tobago" },
      { countryCode: "TV", countryName: "Tuvalu" },
      { countryCode: "TW", countryName: "Taiwan" },
      { countryCode: "TZ", countryName: "Tanzania" },
      { countryCode: "UA", countryName: "Ukraine" },
      { countryCode: "UG", countryName: "Busoga Province" },
      { countryCode: "US", countryName: "United States" },
      { countryCode: "UY", countryName: "Uruguay" },
      { countryCode: "UZ", countryName: "Uzbekistan" },
      { countryCode: "VA", countryName: "Vatican City" },
      { countryCode: "VC", countryName: "Saint Vincent and The Grenadines" },
      { countryCode: "VE", countryName: "Venezuela" },
      { countryCode: "VG", countryName: "British Virgin Islands" },
      { countryCode: "VI", countryName: "Virgin Islands" },
      { countryCode: "VN", countryName: "Vietnam" },
      { countryCode: "VU", countryName: "Vanuatu" },
      { countryCode: "WF", countryName: null },
      { countryCode: "WS", countryName: "Samoa" },
      { countryCode: "XK", countryName: null },
      { countryCode: "YE", countryName: "Aden Municipality" },
      { countryCode: "YT", countryName: "Mayotte" },
      { countryCode: "ZA", countryName: "South Africa" },
      { countryCode: "ZM", countryName: "Zambia" },
      { countryCode: "ZW", countryName: "Zimbabwe" }
    ]
  },

  mutations: {
    SET_CITY_FORECAST(state, forecast) {
      state.cityInfo = forecast;
    },

    SET_CITY_ACTUAL(state, actual) {
      state.actual = actual;
    }
  },

  actions: {
    loadCityForecast({ commit }, { city, code }) {
      const API_KEY = "27612018b6ba443f89d194a31acfea3b";

      axios
        .get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${code}&key=${API_KEY}`
        )
        .then(response => {
          const forecast = response.data;
          if (!forecast) setTimeout(() => location.reload(), 1000);
          commit("SET_CITY_FORECAST", forecast);
        })
        .catch(error => {
          setTimeout(() => location.reload(), 1000);
        });
    },

    loadCityActual({ commit }, { city, code }) {
      const API_KEY = "27612018b6ba443f89d194a31acfea3b";

      axios
        .get(
          `https://api.weatherbit.io/v2.0/current?city=${city}&country=${code}&key=${API_KEY}`
        )
        .then(response => {
          const actual = response.data;
          if (!actual) setTimeout(() => location.reload(), 1000);
          commit("SET_CITY_ACTUAL", actual);
        })
        .catch(error => {
          setTimeout(() => location.reload(), 1000);
        });
    }
  },
  modules: {}
});
