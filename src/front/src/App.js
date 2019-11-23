import React, { Component, Fragment } from 'react';
import './App.css';
import Nav from './components/mods/Nav';
import Message from './components/mods/Message'
import FormMessage from './components/mods/FormMessage';

class App extends Component{
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  componentDidMount = () => {
    this.addMessage({message:'test', pseudo:'Pedro'})
  }

  addMessage = message => {
    let messages = { ...this.state.messages }

    messages[`message-${Date.now()}`] = message

    if(Object.keys(messages).length > 10){
      messages = Object.keys(messages).slice(1,11).map(key => messages[key]);
    }    

    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render(){
    const messages = Object.keys(this.state.messages).map(key => 
    <Message
      isUser={this.isUser}
      message={this.state.messages[key].message}
      pseudo={this.state.messages[key].pseudo} />);

    return (
      <Fragment>
        <Nav/>
        <div className='App container-fluid'>
          <div className='row'>
            <div className='col box'>
              <div>
                <div className='messages' ref={this.messagesRef}>
                  { messages }
                </div>
                <FormMessage addMessage={this.addMessage} pseudo={this.state.pseudo}/>
              </div>
            </div>
            <div className='col-3 bg-light'>
              {this.state.pseudo}
            </div>
    
          </div>
        </div>
      </Fragment>
                
      
    );
  }  
}

export default App;
