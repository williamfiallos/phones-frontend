import React, { Component } from 'react';
import './App.css';

import { Switch, NavLink, Route } from 'react-router-dom';

import axios from 'axios';

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/checkuser", { withCredentials: true })
    .then(responseFromBackend => {
      console.log("Check User in App.js: ", responseFromBackend);
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    })
  }

  syncCurrentUser(userPlaceholder){
    this.setState({ currentUser: userPlaceholder });
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> IronPhones </h1>
          <nav>
            <NavLink to="/"> Home </NavLink>



            <NavLink to="/signup-page"> Signup </NavLink>
            <NavLink to="/login-page"> Login </NavLink>
          </nav>
        </header>

        <Switch>
            {/* Example how to normally do the Route: */}
            {/* <Route path="/some-page" component={ someComponentThatWillRenderWhenUserClicksThisLink } /> */}
            
            <Route exact path="/" component={ Home } />

            {/* <Route path="/signup-page" render={ () => {
              return <Signup currentUser={ this.state.currentUser } 
              onUserChange={ userDoc => this.syncCurrentUser(userDoc) } />
            } } /> */}
            {/* OR below, minus the "return" by using the fat arrow without curly brace */}
            {/* this below is for when you have to pass something to the component, vs the Route{Home} above */}
            <Route path="/signup-page" render={ () => 
              <Signup currentUser={ this.state.currentUser } 
              onUserChange={ userDoc => this.syncCurrentUser(userDoc) } />
            } />

            <Route path="/login-page" render={ () => 
              <Login currentUser={ this.state.currentUser }
                onUserChange={ userDoc => this.syncCurrentUser(userDoc) } />
           } />

                      {/* props. first prop to send from mother to child; sencond prop is from child to mother */}
            {/* <Signup currentUser={ this.state.currentUser } 
            onUserChange={ userDoc => this.syncCurrentUser(userDoc) } /> */}
            
        </Switch>
        <br/>
        <br/>
        <footer>
          Made at Ironhack PTWD 2019
        </footer>
      </div>
    );
  }
}

export default App;
