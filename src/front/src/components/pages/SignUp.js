import React, { Component, Fragment } from 'react'
import FormRegistration from '../mods/FormRegistration'

export default class SignUp extends Component {

    constructor(){
        super();

        this.state = {
            email:'',
            password:'',
            password2:'',
            username:'',
            first_name:'',
            last_name:'',
            school_name:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = evt => {
        this.setState({[evt.target.name]:evt.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("Submit");

        const array = new Array(this.state.username, this.state.email, this.state.first_name, this.state.last_name, this.state.school_name, this.state.password);
        fetch('localhost:8000/api/teachers/', {
            method: 'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(array),
        });
    }
    

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <FormRegistration handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </Fragment>
            
        )
    }
}