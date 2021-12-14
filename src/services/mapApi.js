const axios = require("axios");

const mapApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/",
});

module.exports = mapApi;
