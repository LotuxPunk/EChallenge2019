import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Nav() {
    return (
        <div className='sticky-top mb-2'>
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg stroke'>
                <NavLink className="navbar-brand" to='/'>Talkint</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li className="nav-item"><NavLink className="nav-link" to="/signup">Sign up</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/login">Log in</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/app">App</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
