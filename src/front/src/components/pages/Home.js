import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from '../mods/Nav';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Nav/>
                <div className="container">
                    <div class="jumbotron">
                        <h1 class="display-4">Talkint<small>, Talk Internationnal</small></h1>
                        <hr class="my-4"></hr>
                        <div className='btn-group btn-group-lg'>
                            <Link class="btn btn-info" to='/login'>Log in</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
};

export default Home;