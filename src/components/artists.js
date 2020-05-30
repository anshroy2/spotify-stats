import React, { Component } from 'react';

var spotifywebapi;

class Artists extends Component {
  constructor(props) {
    super(props);
    spotifywebapi = this.props.api;
    console.log(this.props.api);
    this.state = {
      loggedIn: this.props.loggedIn,
      nowPlaying: {
        name: 'Not checked',
        image: ''
      },
      topArtists: []
    };
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
