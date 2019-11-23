import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        return (
            <form>
                <input type="email"/>
                <input type="password"/>
                <button className="btn btn-secondary" type="submit">Valider</button>
            </form>
        )
    }
}
