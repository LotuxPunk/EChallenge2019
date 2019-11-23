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
    lang:this.props.match.params.lang,
    isWaiting:false,
    activity:{
      question:'',
      position:0
    }
  }

  ws = null;

  sendMessage = message => {
    this.ws.send(JSON.stringify({
      username:this.state.pseudo,
      message:message
    }));

  }

  sendAnswer = message => {
    console.log("Hommage à Clément J." + message);
    this.setState({isWaiting:true})
  }

  componentDidMount(){
    this.ws = new WebSocket("ws://thewhitehusky.me:8000/ws/chat/test/");
    this.ws.onopen = (e) => {
        console.log("Connected");
    }
    this.ws.onmessage = (e) => {
      let data = JSON.parse(e.data)

      let messages = {...this.state.messages}
      const message = {pseudo:data['username'], message:data['message']};
      messages[`message-${Date.now()}`] = message;

      if(Object.keys(messages).length > 5){
        messages = Object.keys(messages).slice(1,6).map(key => messages[key]);
      }

      const {xp} = this.state
      this.setState({ messages, xp:xp+1 })
  }

  const {lang} = this.state;
  const {position} = this.state.activity;

  console.log(lang);

  fetch('http://thewhitehusky.me:8000/api/dialog_strings/')
  .then(resp => resp.json())
  .then(data => {
    console.log(data.results)
    const result = data.results.filter(el => el.lang === lang).filter(el => el.position === position);
    this.setState({
      activity:{
        question:result[0].text
      }
    })
    // console.log(result);
  });
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

  showWaiting = () => {
    if(this.state.isWaiting){
      document.getElementById('answerbox').disabled = true;
      return <div className='card-footer'>Waiting for your mate</div>;
    }
  }

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
                <FormMessage sendMessage={this.sendMessage}/>
              </div>
            </div>
            <div className='col-5'>
              <div className='card mb-2'>
                <div className='card-header'>
                  {this.state.pseudo}
                </div>
                <div className='card-body'>
                  <p>Level : {lvl}</p>
                  <div className="progress">
                    <div className="progress-bar bg-success" style={{width: pourc+'%'}} aria-valuenow={xp} aria-valuemin="0" aria-valuemax="5"></div>
                  </div>
                  <p>Exp : {xp}/5</p>
                </div>
              </div>
              <div className='card'>
                <div className='card-header'>
                  Activity
                </div>
                <div className='card-body'>
                  <div className=' mb-3'>
                    {this.state.activity.question}
                  </div>
                  <FormMessage sendMessage={this.sendAnswer}/>
                </div>
                {this.showWaiting()}
              </div>
            </div>
    
          </div>
        </div>
      </Fragment>
                
      
    );
  }  
}

export default App;
