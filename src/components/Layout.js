import React, { Component } from 'react';
import { Link } from 'react-router';
// import AnimeStore from '../stores/AnimeStore';

export default class Layout extends Component {

  render () {
    return (
      <div className='mainContainer'>
        <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            <li>Beer Test</li>
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/sampled'>Sampled</Link></li>
            <li><Link className='link' to='/notsampled'>Not Sampled</Link></li>
            {/* <li><Link className='link' to='/watchList'>WatchList</Link></li> */}
          </ul>
        </div>
        <div className='container'>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
