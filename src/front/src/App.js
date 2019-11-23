import React, { Component, Fragment } from 'react';
import './App.css';
import Nav from './components/mods/Nav';
import Message from './components/mods/Message'
import FormMessage from './components/mods/FormMessage';

class App extends Component{
  chatSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat/test/")
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo,
  }

  addMessage = message => {
    let messages = { ...this.state.messages }

    messages[`message-${Date.now()}`] = message

    if(Object.keys(messages).length > 10){
      messages = Object.keys(messages).slice(1,11).map(key => messages[key]);
    }    

    this.setState({ messages })
  }

  componentDidMount() {
    this.chatSocket.onopen = () => {
      console.log("connected")
    }
    this.chatSocket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      console.log(data["user"])
      this.addMessage({
        message: data['message'],
        pseudo: "Pedro"
      })
    }
  }


  sendMessage = message => {
    this.chatSocket.send(JSON.stringify({
      'message':message
    }))
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
                <FormMessage addMessage={this.addMessage} pseudo={this.state.pseudo} sendMessage={this.sendMessage}/>
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
