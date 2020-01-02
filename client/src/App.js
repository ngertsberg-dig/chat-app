import React from 'react';
import logo from './logo.svg';
import './App.css';
import SendMessage from './components/SendMessage';
import MessageBoard from './components/MessageBoard';
import socketIOClient from 'socket.io-client'
class App extends React.Component{

  async componentDidMount(){
      const port = await fetch("/api/getPort").then(res=>res.json()).then(res=>{
        const endpoint = res.port.port;
        const socket = socketIOClient(res.port.port);
        console.log(endpoint)
        this.setState({ endpoint, socket })
        this.recieveMessage(this.state.socket);
      });

  }
  sendMessage(e){
    e.preventDefault();
    const inputBox = document.querySelector("#sendMessage input[type='text']");
    const message = inputBox.value
    console.log(`sending message: ${message}`);
    this.state.socket.emit('message send',message)
    inputBox.value = ''
  }
  recieveMessage(socket){
    const messageBoard = document.querySelector("#messages ul");
    this.state.socket.on("message recieve",(msg)=>{
      var d = new Date();
      var n = d.toLocaleTimeString();
      console.log(`message recieved: ${msg}`);
      messageBoard.innerHTML += `<li class = 'message'><p class = 'date'>${n}</p><p class = 'message-text'>${msg}</p></li>`;
    })
  }
  render(){
    
    return (
      <div className="App">
        <MessageBoard />
        <SendMessage click = {(e)=>this.sendMessage(e)} />
      </div>

    );
  }
}

export default App;
