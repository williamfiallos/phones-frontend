import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            // these are the req.body.name of each input field in the login form
            email: "",
            originalPassword: "",
            message: null,
        }
    }

    // Reuse for every react form
    genericSync(event){
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post(
            "http://localhost:3001/api/login",
            this.state,
            { withCredentials: true }
        )
        .then( responseFromServer => {
            console.log("Response from Server: ", responseFromServer);
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc);
        })
        .catch( err => {
            console.log("error while loggin in: ", err);
            if (err.response && err.response.data){
                return this.setState({ message: err.response.data.message });
            }
        })
    }


    render(){
        return (
            <section>
                <h2> Login </h2>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Email </label>
                    <input 
                        value = { this.state.email }
                        onChange = { event => this.genericSync(event) }
                        type = "email"
                        name = "email"
                        placeholder = "wifi@wifi.com"
                    />
                    <label> Password </label>
                    <input 
                        value = { this.state.originalPassword }
                        onChange = { event => this.genericSync(event) }
                        type = "text"
                        name = "originalPassword"
                        placeholder = "123*******"
                    />
                    <button> Login </button>
                </form>
                {/* if the message is not NULL then show the message (if there is an error, show the error) */}
                { this.state.message && <div> { this.state.message } </div> }
            </section>
        )
    }
}

export default Login;