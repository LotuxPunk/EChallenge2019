import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Form from '../mods/Form'
import Nav from '../mods/Nav'

export default class Login extends Component {

    state = {
        login:'',
        lang:'',
        goToChat:false
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({goToChat:true});
    }

    handleChange = evt => {
        this.setState({[evt.target.name]:evt.target.value})
    }

    render() {
        if(this.state.goToChat){
            return <Redirect to={/app/+this.state.login+'/'+this.state.lang}/>;
        }
        return (
            <Fragment>
                <Nav/>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <div className='card'>
                            <div className="card-header">Log in</div>
                            <div className='card-body'>
                                <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </Fragment>
        )
    }
}
