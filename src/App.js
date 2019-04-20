import React, { Component } from 'react';
import './App.css';

import { Switch, NavLink, Route } from 'react-router-dom';

import axios from 'axios';

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';

import AddPhone from './components/phone-pages/AddPhone';
import PhoneList from './components/phone-pages/PhoneList';


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

  logout(){
    axios.delete(
      "http://localhost:3001/api/logout", { withCredentials: true }
    )
    .then( () => this.syncCurrentUser(null))
    .catch( err => console.log(err) )
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> IronPhones </h1>
          <nav>
            {/* Home will be always visible to everyone */}
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/phone-list"> Phone List </NavLink>


            { this.state.currentUser ? (
              // these pages will be visible only if the user exists
                // notice the <span> wrapper since in React each component to render needs to be wrapped by a parent
                <span> 
                  <NavLink to="/add-phone"> Add a Phone </NavLink>
                  <button onClick={ () => this.logout }> Log Out </button>
                </span>
            ) : (
              // these pages will be visible only if there is no user in the session
              <span>
                <NavLink to="/signup-page"> Signup </NavLink>
                <NavLink to="/login-page"> Login </NavLink>
              </span>
            ) }
          </nav>
        </header>

        <Switch>
            {/* Example how to normally do the Route: */}
            {/* <Route path="/some-page" component={ someComponentThatWillRenderWhenUserClicksThisLink } /> */}
            
            <Route exact path="/" component={ Home } />

            {/* this way we use when we are passing params down to componentDidMount() {

            } */}

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

            {/* change this route below to prevent users to access the routes when they are not logged in,
            we are passing currentUser into the component so we can check there whether it's available or not */}
            {/* <Route path="/add-phone" component={ AddPhone } /> */}
            <Route path="/add-phone" render={ () => <AddPhone currentUser={ this.state.currentUser }  /> }/>
            <Route path="/phone-list" component={ PhoneList } />

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
