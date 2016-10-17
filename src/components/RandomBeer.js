import React, { Component } from 'react';
import BeerStore from '../stores/BeerStore';
import BeerActions from '../actions/BeerActions';

export default class RandomBeer extends Component {
  constructor () {
    super();

    this.state = {
      randomBeer: BeerStore.getRandomBeer(),
      rating: '',
      comments: ''
    };

    this._onChange = this._onChange.bind(this);
    this._fetchRandomBeer = this._fetchRandomBeer.bind(this);
    this._grabRatingInput = this._grabRatingInput.bind(this);
    this._grabCommentsInput = this._grabCommentsInput.bind(this);
    this._submitSample = this._submitSample.bind(this);
  }

  componentWillMount () {
    BeerStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    BeerStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      randomBeer: BeerStore.getRandomBeer()
    });
  }

  _fetchRandomBeer () {
    BeerActions.fetchRandomBeer();
  }

  _grabCommentsInput (e) {
    let comments = e.target.value;
    this.setState({
      comments: comments
    });
  }

  _grabRatingInput (e) {
    let rating = e.target.value;
    this.setState({
      rating: rating
    });
  }

  _submitSample () {
    let { rating, comments, randomBeer } = this.state;
    let name = randomBeer.name;
    let description = randomBeer.description;
    BeerActions.submitSample(rating, comments, name, description);
  }

  render () {
    let { randomBeer } = this.state;
    let RandomBeer = [];
    if (randomBeer !== undefined) {
      RandomBeer =
        <div>
          <h3>{randomBeer.name}</h3>
          <h5>{randomBeer.description}</h5>
          <button type='button' className='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'>Open Me</button>
          <div id='myModal' className='modal fade bs-example-modal-md firstLevelModal' tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
            <div className='modal-dialog modal-md secondLevelModal' role='document'>
              <div className='modal-content thirdLevelModal'>
                <div className='modalPicContainer fourthLevelModal' >
                  <div>
                    <div className='sideImageInfo'>
                      <h4>Name: {randomBeer.name || ''}</h4>
                      <h4>Description: {randomBeer.description || ''}</h4>
                      <h4>Rating: Input Here</h4>
                      <input type='number' onChange={this._grabRatingInput} max='10' min='1' placeholder='1 - 10' />
                      <input type='text' onChange={this._grabCommentsInput} placeholder='Type in  Comments' />
                      <h4>Comments: Input Here</h4>
                    </div>
                  </div>
                  <div className='btnContainer'>
                    <button onClick={this._submitSample} className='btn btn-primary' data-dismiss='modal'>Sampled</button>
                    <button className='btn btn-success' data-dismiss='modal'>Not Sampled</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>;
    }

    return (
      <div>
        <button onClick={this._fetchRandomBeer}>Get Random Beer</button>
        {RandomBeer}
      </div>
    );
  }
}
