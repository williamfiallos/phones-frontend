import React, { Component } from 'react';
import axios from 'axios';

class PhoneList extends Component {
    constructor(props){
        super(props);
        this.state = {
            // the array stays empty until the response from server doesn't fill it
            phonesArray: [],
        };
    }

    componentDidMount(){
        axios.get(
            "http://localhost:3001/api/phones", // since it's a GET only one is mandatory!!
            { withCredentials: true }
        )
        .then( responseFromAPI => this.setState({ phonesArray: responseFromAPI.data}) )
        .catch( err => console.log(err) );
    }

    render(){
        // console.log('array of phones: ', this.state.phonesArray); <=works fine, now we destructure
        const { phonesArray } = this.state;
        return(
            <section>
                { phonesArray.map(onePhone => {
                    return (
                        <li key={ onePhone._id }>
                            { onePhone.model } by { onePhone.brand }
                            <p> $ { onePhone.price } </p>
                            <img width="100" src={ onePhone.image } alt={ onePhone.model } />
                        </li>
                    )
                }) }
            </section>
        )
    }
}

export default PhoneList;