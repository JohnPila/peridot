const API_KEY = "4687a77640a44100b4740e60780ffe5b";
const BASE_FARE = 100;
const FARE_PER_KILOMETER = 20;

class GeoapifyConfig {

  get apiKey() {
    return API_KEY;
  }

  computeCost(distance) {
    return BASE_FARE + (Math.ceil(distance / 1000) * FARE_PER_KILOMETER);
  }
}

export default new GeoapifyConfig();
