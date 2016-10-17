import React, { Component } from 'react';
import BeerStore from '../stores/BeerStore';
import BeerActions from '../actions/BeerActions';

export default class RandomBeer extends Component {
  constructor () {
    super();

    this.state = {
      sampledBeers: BeerStore.getSampledBeers(),
      beer: [],
      rating: '',
      comments: ''
    };

    this._onChange = this._onChange.bind(this);
    this._submitChanges = this._submitChanges.bind(this);
    this._grabRatingInput = this._grabRatingInput.bind(this);
    this._grabCommentsInput = this._grabCommentsInput.bind(this);
  }

  componentWillMount () {
    BeerActions.fetchSampledBeers();
    BeerStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    BeerStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      sampledBeers: BeerStore.getSampledBeers()
    });
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

  _grabInfo (beer) {
    console.log('beer: ', beer);
    this.setState({
      beer: beer
    });
  }

  _submitChanges () {
    let { rating, comments, beer } = this.state;
    // BeerActions.sendSampleChanges(rating, comments, beer);
  }

  render () {
    let { sampledBeers, beer } = this.state;
    // console.log('sampledBeers in SampledPage: ', sampledBeers);

    return (
      <div>
        <h1>Sampled Beers</h1>
        <table className='table'>
          <thead>
            <th>Name</th>
            <th>Rating</th>
            <th>Comments</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
          {
            sampledBeers.map((beer, i) => (
              <tr key={i}>
                <td>{beer.beer}</td>
                <td>{beer.rating}</td>
                <td>{beer.comments}</td>
                {beer.description === 'undefined' ? <td>Description: No Description!</td> : <td>Description: {beer.description}</td>}
                <td><button data-toggle='modal' data-target='#myModal' onClick={this._grabInfo.bind(this, beer)}>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <div id='myModal' className='modal fade bs-example-modal-md firstLevelModal' tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
          <div className='modal-dialog modal-md secondLevelModal' role='document'>
            <div className='modal-content thirdLevelModal'>
              <div className='modalPicContainer fourthLevelModal' >
                <div>
                  <div className='sideImageInfo'>
                    <h4>Name: {beer.beer || ''}</h4>
                    {beer.description === 'undefined' ? <h4>Description: No Description!</h4> : <h4>Description: {beer.description}</h4>}
                    <input type='number' onChange={this._grabRatingInput} max='10' min='1' placeholder={beer.rating} />
                    <input type='text' onChange={this._grabCommentsInput} placeholder={beer.comments} />
                  </div>
                </div>
                <div className='btnContainer'>
                  <button onClick={this._submitChanges} className='btn btn-primary' data-dismiss='modal'>Submit Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
