import React, { Component, Fragment } from 'react'
import Form from '../mods/Form'
import Nav from '../mods/Nav'

export default class Login extends Component {
    render() {
        return (
            <Fragment>
                <Nav/>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <div className='card'>
                            <div class="card-header">Log in</div>
                            <div className='card-body'>
                                <Form/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </Fragment>
        )
    }
}
