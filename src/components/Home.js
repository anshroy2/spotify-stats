import React, { Component } from 'react';
import Artists from './artists';
import Spotify from 'spotify-web-api-js';


const spotifywebapi = new Spotify();

class Home extends Component {
    constructor(props) {
        super(props);
        var spotify_login_href = 'http://localhost:8888/login';
        if (process.env.NODE_ENV === 'production') {
            spotify_login_href = 'http://spotify-stats-backend.now.sh/login';
        }
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token? true : false,
            spotify_href: spotify_login_href
        };
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
    render() {
        if (this.state.loggedIn) {
            return (
                <Artists 
                logged={this.state.loggedIn}
                api={spotifywebapi}/>
            )
        }
        else {
            return (
                <div>
                    <a href={this.state.spotify_href}>
                        <button>Login with Spotify</button>
                    </a>
                </div>
            );
        }
    }
}

export default Home;