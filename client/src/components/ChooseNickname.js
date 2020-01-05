import React from 'react';
import '../styles/ChooseNickname.sass'
const ChooseNickname = ( { click } ) =>{
    return(
        <div id = 'chooseNickname'>
            <div className = 'wrapper'>
                <form id = 'chooseNicknameForm' onSubmit = {click}>
                    <input type = 'text' placeholder = 'choose a nickname..'></input>
                    <input type = 'submit' value = 'submit'></input>
                    <input type = 'file' name = 'profile-pic'></input>
                </form>
            </div>
        </div>
    )
}

export default ChooseNickname;