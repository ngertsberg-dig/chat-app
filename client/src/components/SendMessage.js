import React from 'react';
import "../styles/SendMessage.sass"
const SendMessage = ( { click }) =>{
    return(
        <form onSubmit = {click} id = "sendMessage">
            <input type = 'text' placeholder = 'Type a message...'></input>
            <input type = 'submit' value = 'send'></input>
        </form>

    )
}

export default SendMessage;