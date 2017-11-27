import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getRandomDog: function() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },
  getDogsOfBreed: function(breed) {
    return axios.get("https://dog.ceo/api/breed/" + breed + "/images");
  },
  getBaseBreedsList: function() {
    return axios.get("https://dog.ceo/api/breeds/list");
  },
  getData: function() {
    return axios.get('/api/client/');
  },
  getFixedData: function() {
    return axios.get('/api/fixedcost/');
  },
  getFlexData: function() {
    return axios.get('/api/flexspend/');
  },
  getGoalData: function() {
    return axios.get('/api/goal/');
  }
};
