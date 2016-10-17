import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveRandomBeer (randomBeer) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_RANDOM_BEER',
      payload: { randomBeer }
    });
  },

  receiveSampledBeers (sampledBeers) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_SAMPLED_BEERS',
      payload: { sampledBeers }
    });
  }

};
export default ServerActions;
