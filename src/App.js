import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Artists from './components/artists.js';
import Home from './components/Home.js';

class App extends Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    return (
      <Router>
        <div className='Website-background'>
          <Navbar className='navbar-color' dark expand='md'>
            <NavbarBrand href='/'>Spotify Stats</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='/artists/'>Artists</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Router exact path='/artists' component={Artists} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;