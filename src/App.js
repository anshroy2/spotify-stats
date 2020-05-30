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
            <NavbarBrand href='/'>Ansh Roy</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='/about/'>About</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <br />
          <Switch>
            <Route exact path='/' component={Artists} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;