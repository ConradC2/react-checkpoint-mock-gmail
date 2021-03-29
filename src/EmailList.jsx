// EmailList
import React from 'react';

function EmailList(props){
    let emailList = props.emailList.map(each => (
        <div>{each.subject} --- {each.sender} <button onClick={() => props.viewEmail(each.id)}>View Email</button>
        </div>
    ))
    return(
        <div>
            {emailList}
        </div>
    )
}

export default EmailList