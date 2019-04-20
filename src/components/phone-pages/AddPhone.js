import React, { Component } from 'react';
import axios from 'axios';

class AddPhone extends Component {
    constructor(props){
        super(props);
        this.state = {
            model: "",
            brand: "",
            price: "",
            image: "",
            specs: ["", "", ""],
            isSubmitSuccessful: false,
        };
    }

    // for all fields except images and specs
    genericSync(event){
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    uploadImage(event){
        // console.log("upload image: ", event.target)
        const { files } = event.target;
        const uploadData = new FormData();

        uploadData.append("submittedFile", files[0]);

        axios.post(
            "http://localhost:3001/api/upload-file",
            uploadData,
            { withCredentials: true }
        )
        .then( response => this.setState({ image:response.data.fileUrl }))
        .catch( err => console.log(err) );
    }

    syncSpec(event, index){
        const { specs } = this.state;
        // update the spec with whatever user typed in 
        // which means replace empty string with the value user typed in, on index 0, then 1, then 2, etc.
        specs[index] = event.target.value
        // update the state with the updated specs array
        this.setState({ specs });
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post(
            "http://localhost:3001/api/phones", // which route I'm hitting in the backend
            this.state, // what I'm sending
            { withCredentials: true }

        )
        .then( response => {
            console.log("new phone: ", response.data);
            this.setState({ isSubmitSuccessful: true })
        } )
        .catch( err => console.log(err) );
    }


    render(){
        return(
            <section>
                <h2> Add a Phone </h2>
                <form onSubmit={ (e) => this.handleSubmit(e) } >
                    <label> Model: </label>
                    <input 
                        value = { this.state.model }
                        // onChange is standard, must use. Note "event" can be also "e"
                        onChange = { event => this.genericSync(event) }
                        type = "text"
                        name = "model"
                        placeholder = "iPhone X"
                    />
                    <label> Brand: </label>
                    <input 
                        value = { this.state.brand }
                        // onChange is standard, must use. Note "event" can be also "e"
                        onChange = { e => this.genericSync(e) }
                        type = "text"
                        name = "brand"
                        placeholder = "Apple"
                    />
                    <label> Price: </label>
                    <input 
                        value = { this.state.price }
                        // onChange is standard, must use. Note "event" can be also "e"
                        onChange = { e => this.genericSync(e) }
                        type = "number"
                        name = "price"
                        placeholder = "599.99"
                    />
                    <label> Image: </label>
                    <input 
                        // onChange is standard, but note for IMAGE it is UPLOADIMAGE!! Note "event" can be also "e"
                        onChange = { e => this.uploadImage(e) }
                        type = "file"
                    />
                    <br />
                    <label> Specs: </label>
                    <br />
                    <small> Has to be 3 letters at least </small>
                    <br />

                    { this.state.specs.map((oneSpec, index) => {
                        return (
                            <input 
                                key = {index}
                                type = "text"
                                value = { oneSpec }
                                onChange = { event => this.syncSpec(event, index) }
                            />
                        )
                    } ) }
                    <button> Save </button>
                </form>
            </section>
        )
    }
}

export default AddPhone;