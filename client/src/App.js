import React from 'react';
import logo from './logo.svg';
import './App.css';
import SendMessage from './components/SendMessage';
import MessageBoard from './components/MessageBoard';
import ChooseNickname from './components/ChooseNickname';
import DarkModeButton from './components/DarkModeButton';
import socketIOClient from 'socket.io-client'
class App extends React.Component{
  constructor(){
    super();
    this.setNickname = this.setNickname.bind(this);
  }
  async componentDidMount(){
      const port = await fetch("/api/getPort").then(res=>res.json()).then(res=>{
        const endpoint = res.port.port;
        const socket = socketIOClient(res.port.port);
        console.log(endpoint)
        this.setState({ endpoint, socket })
        this.recieveMessage(this.state.socket);
        this.userConnected(this.state.socket);
      });
  }
  userConnected(socket){
    socket.on('user connected',(nickname)=>{
      const messageBoard = document.querySelector("#messages ul");
      messageBoard.innerHTML += `<li class = 'user-connected'>${nickname} connected..</li>`;
    })
  }
  sendMessage(e){
    e.preventDefault();
    const inputBox = document.querySelector("#sendMessage input[type='text']");
    const message = inputBox.value
    console.log(`sending message: ${message}`);
    
    this.state.socket.emit('message send',message, this.state.nickName)
    inputBox.value = ''
  }
  recieveMessage(socket){
    const messageBoard = document.querySelector("#messages ul");
    this.state.socket.on("message recieve",(msg,nickname)=>{
      var d = new Date();
      var n = d.toLocaleTimeString();
      console.log(`message recieved: ${msg}`);
      messageBoard.innerHTML += `<li class = 'message'><p class = 'date'>${n}</p><div class='profile-pic'><img src = ${this.state.profilePic} alt = 'profile pic'></div><p class = 'message-text'>${nickname}: ${msg}</p></li>`;
    })
  }
  async setNickname(e){
    e.preventDefault();
    const nickname = document.querySelector("#chooseNicknameForm input[type='text']").value;
    let profilePic = document.querySelector("#chooseNicknameForm input[type='file']");
    let statePic;
    if(profilePic.files.length == 0){
      statePic = 'http://placehold.it/100x100';
    }else{
      statePic = URL.createObjectURL(profilePic.files[0]);
    }
    if(nickname != ''){
      const getNickname = await fetch("/api/setNickname",
      {
        method:"POST",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ nickname })
      }).then(res=>res.json());
      this.setState({ nickName : getNickname.nickname, profilePic: statePic});
      this.state.socket.emit('username set', getNickname.nickname);
      document.querySelector("#chooseNickname").remove();
      window.pic = profilePic;
      
    }else{alert("enter a nickname")}
  }
  darkModeClick(e){
    const button = e.target;
    const activateDarkMode = (e) =>{
      e.target.classList.add("active");
      e.target.textContent = "Light Mode";
      document.querySelector("html").classList.add("darkMode");
    }
    const deactivateDarkMode = (e) =>{
      e.target.classList.remove("active");
      e.target.textContent = "Dark Mode";
      document.querySelector("html").classList.remove("darkMode");
    }

    e.target.classList.contains("active") === true ? deactivateDarkMode(e) : activateDarkMode(e)
  }
  render(){
    
    return (
      <div className="App">
        <DarkModeButton click = {(e)=>this.darkModeClick(e)}/>
        <ChooseNickname click = {(e)=>this.setNickname(e)}/>
        <MessageBoard />
        <SendMessage click = {(e)=>this.sendMessage(e)} />
      </div>

    );
  }
}

export default App;
