import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifywebapi = new Spotify();

class Artists extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token? true : false,
      nowPlaying: {
        name: 'Not checked',
        image: ''
      },
      topArtists: []
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
        if (response.item !== undefined) {
          this.setState({
            nowPlaying: {
              name: response.item.name,
              image: response.item.album.images[0].url
            }
          }) 
        }
      })
  }
  getTopArtists() {
    spotifywebapi.getMyTopArtists()
      .then((response) => {
        var local_arr = [];
        response.items.map((obj) => {
          local_arr.push(obj.name);
        });
        this.setState({
              topArtists: local_arr
        });
    })
  }
  render() {
    return (
    <div className="Artists">
      <a href="http://spotify-stats-backend.now.sh/login">
        <button>Login with Spotify</button>
      </a>
      <div> Now playing: {this.state.nowPlaying.name}</div>
      <div>
        <img src={this.state.nowPlaying.image} style={{width: 100}}></img>
      </div>
      <button onClick={() => this.getNowPlaying()}>
        Check Now Playing 
      </button>
      <button onClick={() => this.getTopArtists()}>
        Get Top Artists
      </button>
      <ol>
        {this.state.topArtists.map((response) => {
          return <li>{response}</li>
        })}
      </ol>
      
    </div>
    );
  }

}

export default Artists;
