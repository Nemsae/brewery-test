import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveRandomBeer () {
    axios.get('/api/beer/random')
      .then((res) => {
        // console.log('res in API: ', res);
        ServerActions.receiveRandomBeer(res.data.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveRandomBeer', err);
      });
  },

  sendSample (rating, comments, name, description) {
    axios.post(`/api/beer/sample?rating=${rating}&comments=${comments}&name=${name}&description=${description}`)
      .then((res) => {
        // console.log('res in API: ', res);
        ServerActions.receiveSampledBeers(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.sendSample', err);
      });
  },

  fetchSampledBeers () {
    axios.get('/api/beer/sample')
      .then((res) => {
        // console.log('res in API: ', res.data);
        ServerActions.receiveSampledBeers(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveRandomBeer', err);
      });
  }

};

export default API;
