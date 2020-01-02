import React from 'react';
import '../styles/DarkModeButton.sass'
const DarkModeButton = ( { click } ) =>{
    return(
        <div id='setDarkMode'>
            <button onClick ={click}>Dark mode</button>
        </div>
    )
}

export default DarkModeButton;