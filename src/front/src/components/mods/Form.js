import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        const { handleChange, handleSubmit } = this.props;
        
        return(
            <form className='form-signin' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="email">Username</label>
                    <input onChange={handleChange} type="text" className="form-control" id="login" name="login" required autoFocus/>
                </div>
                <div className="form-group">
                    <label for="lang">Language</label>
                    <input onChange={handleChange} type="text" className="form-control" id="lang" name="lang" required autoFocus/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        )
    }
}
