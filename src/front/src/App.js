import React, { Component, Fragment } from 'react';
import './App.css';
import Nav from './components/mods/Nav';
import Message from './components/mods/Message'
import FormMessage from './components/mods/FormMessage';
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import './animations.css'

class App extends Component{
  state = {
    messages: {},
    xp:0,
    pseudo: this.props.match.params.pseudo,
  }

  addMessage = message => {
    let messages = { ...this.state.messages }

    messages[`message-${Date.now()}`] = message

    if(Object.keys(messages).length > 5){
      messages = Object.keys(messages).slice(1,6).map(key => messages[key]);
    }

    const {xp} = this.state
    this.setState({ messages, xp:xp+1 })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render(){
    const messages = Object.keys(this.state.messages).map(key =>(
      <CSSTransition
          timeout={200}
          classNames='fade'
          key={key}>
            <Message
              isUser={this.isUser}
              message={this.state.messages[key].message}
              pseudo={this.state.messages[key].pseudo} />
          </CSSTransition>
    ));

    const xp = (this.state.xp % 5);
    const lvl = Math.floor(this.state.xp / 5);
    const pourc = xp / 5 * 100;
    


    return (
      <Fragment>
        <Nav/>
        <div className='App container-fluid'>
          <div className='row'>
            <div className='col box'>
              <div>
                <div className='messages' ref={this.messagesRef}>
                  <TransitionGroup className='message'>
                    { messages }
                  </TransitionGroup>
                </div>
                <FormMessage addMessage={this.addMessage} pseudo={this.state.pseudo} sendMessage={this.sendMessage}/>
              </div>
            </div>
            <div className='col-3'>
              <div className='card'>
                <div className='card-header'>
                  {this.state.pseudo}
                </div>
                <div className='card-body'>
                  <p>Niveau : {lvl}</p>
                  <div className="progress">
                    <div className="progress-bar bg-success" style={{width: pourc+'%'}} aria-valuenow={xp} aria-valuemin="0" aria-valuemax="5"></div>
                  </div>
                  <p>Exp : {xp}/5</p>
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </Fragment>
                
      
    );
  }  
}

export default App;
