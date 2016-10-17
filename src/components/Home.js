import React, { Component } from 'react';
import RandomBeer from './RandomBeer';

export default class Home extends Component {
  render () {
    return (
      <div>
        <h1>Get Random Beer</h1>
        <RandomBeer />
      </div>
    );
  }
}
