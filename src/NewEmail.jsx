import React from 'react';

function newEmail(props) {
    if (props.sendingEmail){
    return(
        <div>
            
            <form onSubmit={props.sendAction}> 
                <div><label>Sender: </label><input type="text" name="sender"/> </div>
                <div><label>Recipient: </label><input type="text" name="recipient" /></div>
                <div><label>Subject: </label><input type="text" name="subject" /></div>
                <div><label>Message: </label><textarea rows="10" cols="60"></textarea></div>

                <input type="submit" value="Send email"  />
                <button onClick = {props.cancelAction}>Cancel</button> 
            </form>
        </div>
    )
    }
    else {return (<div></div>)}
}

export default newEmail
