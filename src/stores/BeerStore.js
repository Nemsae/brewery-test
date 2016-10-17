import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _randomBeer = undefined;
let _sampledBeers = [];

class BeerStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'RECEIVE_RANDOM_BEER': {
          let { randomBeer } = action.payload;
          _randomBeer = randomBeer;
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_SAMPLED_BEERS': {
          let { sampledBeers } = action.payload;
          _sampledBeers = sampledBeers;
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getRandomBeer () {
    return _randomBeer;
  }

  getSampledBeers () {
    return _sampledBeers;
  }
}

export default new BeerStore();
