import React, { Component, Fragment } from 'react'

export default class FormMessage extends Component {
    state = {
        message:'',
        length:0
    }

    createMessage = () => {
        const { addMessage, pseudo } = this.props
    
        const message = {
          pseudo,
          message: this.state.message
        }
        addMessage(message);
        this.setState({ message: '', length:0 })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.createMessage()
      }

    handleChange = event =>{
        const message = event.target.value
        const length = message.length
        this.setState({ message, length })
    }

    handleKeyUp = event => {
        if (event.key === 'Enter') {
          this.createMessage()
        }
      }

    render() {
        return (
          <Fragment>
            <form className='form' onSubmit={this.handleSubmit}>
                <textarea className='form-control' value={this.state.message} onChange={this.handleChange} onKeyUp={this.handleKeyUp} autoFocus required/>
                <button className='m-1 btn btn-info float-right' type='submit' >Send</button>
            </form>
            <div className='p-1 text-light float-left' >Lenght : { this.state.length }</div>
          </Fragment>
            
        )
    }
}
