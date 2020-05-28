import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifywebapi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token? true : false,
      nowPlaying: {
        name: 'Not checked',
        image: ''
      }
    }
    if (params.access_token) {
      spotifywebapi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifywebapi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
  }
  render() {
    return (
    <div className="App">
      <a href="https://spotify-stats-backend.now.sh/login">
        <button>Login with Spotify</button>
      </a>
      <div> Now playing: {this.state.nowPlaying.name}</div>
      <div>
        <img src={this.state.nowPlaying.image} style={{width: 100}}></img>
      </div>
      <button onClick={() => this.getNowPlaying()}>
        Check Now Playing 
      </button>
    </div>
    );
  }

}

export default App;
