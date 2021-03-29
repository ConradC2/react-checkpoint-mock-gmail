/*
Mandatory Content
 --View all of my email messages (subject line + sender)
 --View one of my email messages with all of its details
 --Send an email
 --Search for a specific email by subject
Advanced Content
 --Sort my emails by date
 --Delete an email that I no longer need
 --Search for a specific email by sender

*/
import React from 'react';
import NewEmail from './NewEmail';
import ViewEmail from './ViewEmail';
import EmailList from './EmailList';
//import Search from './search'
import './App.css';



const Email = 'http://localhost:3001/emails'
const SendEmail = 'http://localhost:3001/send'
const SearchEmail = 'http://localhost:3001/search'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        allEmails: [],
        fullEmailList: [],
        email: {},
        viewingEmail: false,
        sendingEmail: false,
        newEmailState: [],
        sentEmailResponse: {},
     // deleteEmail: 
       // getSearchResults: props.getSearchResults,
    }
  }

  /*  componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
  Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, 
  this is a good place to instantiate the network request. 
  https://reactjs.org/docs/react-component.html#componentdidmount
  */
   async componentDidMount() {
    this.getEmails();
  }

  async getEmails() {
    const response = await fetch(Email);
    const json = await response.json();
    //console.log(response.json);
    
    this.setState({ allEmails: json });
    this.setState({ fullEmailList: json });
  }

  async getSearchData() {
    const response = await fetch(SearchEmail);
    const json = await response.json();
    //console.log(response.json);
    
    this.setState({ allEmails: json });
    this.setState({ fullEmailList: json });
  }
  viewEmail = (emailID) => {
    let currentEmail = this.state.allEmails.filter(each => each.id === emailID);
    this.setState({email: currentEmail});
    this.setState({ viewingEmail: true });
  }
  viewAll = () => {
    this.setState({ viewingEmail: false });
  }
  newEmail = () => {
    this.setState({ allEmails: [], sendingEmail: true, });
  }
  emailCancelled = (e) => {
    e.preventDefault();
    this.setState({allEmails: this.state.fullEmailList, sendingEmail: false});
  }
  sendEmail = (e) => {
    e.preventDefault();
    
    let [sender,recipient,subject,message] = Array.from(e.target.elements).slice(0,4).map(element => element.value);
    let messageid = this.state.fullEmailList[this.state.fullEmailList.length - 1].id + 1; 

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: sender,
        recipient: recipient,
        subject: subject,
        message: message,
        id: messageid
      })
    };
    
    fetch(SendEmail, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({sentEmailResponse: data}))
  }

  // searchMethod(emailSearch) {
  //   this.state.getEmailResults(
  //     {
  //       q: emailSearch.target.value;
  //       sender: sender,
  //       recipient: recipient,
  //       subject: subject,
  //       message: message,
  //       id: messageid
  //     },
  //     (results) => {
  //       this.setState({ email: results.items[0], email: results.items });
  //     }
  //   );
  // }

  // deleteEmail() {

  // }

//   useEffect(() => {
//     // DELETE request using fetch with error handling
//     fetch(email, { method: 'DELETE' })
//         .then(async response => {
//             const data = await response.json();

//             // check for error response
//             if (!response.ok) {
//                 // get error message from body or default to response status
//                 const error = (data && data.message) || response.status;
//                 return Promise.reject(error);
//             }

//             setStatus('Delete successful');
//         })
//         .catch(error => {
//             setErrorMessage(error);
//             console.error('There was an error!', error);
//         });
// }, []);

  render(){
  
    return (

      <div className='gmail-mock'>
        <label>Search </label> <input type="text" name="search" placeholder="Search for email" onChange={this.SearchMethod} /> <button onClick={this.search}>Search</button>
          {(!this.state.viewingEmail) ? 
            <div className="compose">
            <button onClick={this.newEmail}>New Email</button>
            <EmailList emailList={this.state.allEmails} viewEmail={this.viewEmail}/>
            </div> : <div>
            <ViewEmail currentEmail={this.state.email} />
            <button onClick={this.viewAll}>Back</button>
            <button onClick={this.deleteEmail}>Delete Email</button>
          </div>
         }
           <div >
            <NewEmail cancelAction={this.emailCancelled} sendAction={this.sendEmail} sendingEmail={this.state.sendingEmail} />
          </div>
      </div>
          
    );
  }
}

export default App;
