import API from '../API';

const BeerActions = {
  fetchRandomBeer () {
    API.receiveRandomBeer();
  },

  submitSample (rating, comments, name, description) {
    API.sendSample(rating, comments, name, description);
  },

  fetchSampledBeers () {
    API.fetchSampledBeers();
  }

};

export default BeerActions;
