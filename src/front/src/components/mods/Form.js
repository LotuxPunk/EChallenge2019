import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        const { handleChange, handleSubmit } = this.props;
        
        return(
            <form className='form-signin' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input onChange={handleChange} type="email" className="form-control" id="email" name="email" required autoFocus/>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input onChange={handleChange} type="password" className="form-control" id="password" name="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        )
    }
}
