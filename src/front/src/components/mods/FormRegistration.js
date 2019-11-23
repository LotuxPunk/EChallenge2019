import React, { Component } from 'react';

export default class FormRegistration extends Component {

    render(){
        const { handleChange, handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="last_name">Last name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="last_name" name="last_name"/>
                </div>
                <div className="form-group">
                    <label for="first_name">First name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="first_name" name="first_name"/>
                </div>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input onChange={handleChange} type="text" className="form-control" id="username" name="username"/>
                </div>
                <div className="form-group">
                    <label for="school_name">School name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="school_name" name="school_name"/>
                </div>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input onChange={handleChange} type="email" className="form-control" id="email" name="email"/>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input onChange={handleChange} type="password" className="form-control" id="password" name="password"/>
                </div>
                <div className="form-group">
                    <label for="password2">Confirm password</label>
                    <input onChange={handleChange} type="password" className="form-control" id="password2" name="password2"/>
                </div>
                <button type="submit" className="btn btn-primary">Confirm</button>
            </form>
        )
    }
}
