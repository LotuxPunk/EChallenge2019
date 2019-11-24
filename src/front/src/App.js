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
    otherIsWaiting:false,
    isWaiting:false,
    activity:{
      question:'',
      answer:'',
      position:0
    },
    questions:{}
  }

  ws = null;
  ws_activity = null;

  sendMessage = message => {
    this.ws.send(JSON.stringify({
      username:this.state.pseudo,
      message:message
    }));

  }

  sendAnswer = message => {
    console.log("Hommage à Clément J." + message);
    console.log(this.state.activity.answer.toString());
    console.log(message.toString());
    if (this.state.activity.answer.localeCompare(message.toString())) {
      console.log("good answer!");
      
      if (!this.state.otherIsWaiting) {
        this.setState({isWaiting:true})
      } else {
        this.setState({otherIsWaiting:false})
        const {position} = this.state.activity;
        const {lang} = this.state;
        console.log(position);
        const newPosition = position +1
        const result = this.state.questions.filter(el => el.lang === lang).filter(el => el.position === newPosition)
        this.setState({
          activity:{
            position:newPosition,
            question:result[0].text,
            answer:result[0].answer
          }
        })
      }
      this.ws_activity.send(JSON.stringify({"username":this.state.pseudo, "type_notif":"done"}))
    }
    
  }

  componentDidMount(){
    this.ws = new WebSocket("ws://127.0.0.1:8000/ws/chat/test/");
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

  this.ws_activity = new WebSocket("ws://127.0.0.1:8000/ws/rpg/test/");
  this.ws_activity.onopen = (e) => {
    console.log("Connected to activity");
  }
  this.ws_activity.onmessage = (e) => {
    let data = JSON.parse(e.data)
    if (this.state.pseudo === data.username) {
      console.log("my own stuff");
    } else if (this.state.isWaiting) {
      console.log('other person is done, move on')
      this.setState({isWaiting:false})
      const {position} = this.state.activity;
      console.log(position)
      const newPosition = position +1
        const {lang} = this.state;
        const result = this.state.questions.filter(el => el.lang === lang).filter(el => el.position === newPosition)
        this.setState({
          activity:{
            position:newPosition,
            question:result[0].text,
            answer:result[0].answer
          }
        })
    } else {
      console.log("other is waiting");
      this.setState({otherIsWaiting:true})
    }
  }

  const {lang} = this.state;
  const {position} = this.state.activity;

  console.log(lang);
  console.log(position);

  fetch('http://127.0.0.1:8000/api/dialog_strings/')
  .then(resp => resp.json())
  .then(data => {
    console.log(data.results)
    this.setState({questions:data.results});
    const result = data.results.filter(el => el.lang === lang).filter(el => el.position === position);
    this.setState({
      activity:{
        question:result[0].text,
        answer:result[0].answer,
        position:0
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
