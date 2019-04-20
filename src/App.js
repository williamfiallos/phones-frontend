import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';

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
        </header>
                  {/* props. first prop to send from mother to child; sencond prop is from child to mother */}
        <Signup currentUser={ this.state.currentUser } 
        onUserChange={ userDoc => this.syncCurrentUser(userDoc) } />
        
        <Login currentUser={ this.state.currentUser }
          onUserChange={ userDoc => this.syncCurrentUser(userDoc) } />
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
