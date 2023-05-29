import {useState} from "react"
import axios from "axios"
import ListMessage from "./ListMessage"
import main from "./main.module.css";
import Aside from "./Aside";
import NewMessage from "./NewMessage";
import React from "react";



var bool2 = true
let baseURL = "http://localhost:8000/api/messages"
let baseURL2 = "http://localhost:8000/api/messages/search"

function Main(props){
  var bool = props.bool;
  const [messages,setMessages] = useState([])
  const [allmsgs,setAllmsgs] = useState([]) 
  //sert a envoyer la requete 1 seule fois
  
    React.useEffect(() => {
      if(bool){
      axios.get(baseURL).then((response) => {
        setMessages(response.data.messages.reverse());
        setAllmsgs(messages);
      });
      bool = false;
    }}, []);
  
  /*
  if (props.filter.user){
    axios
    .get(`http://localhost:8000/api/users/exists/${props.filter.user}`)
    .then((response)=> {
      console.log("là peut-être",response.data.message)
      if(!response.data.message){
        window.confirm("utilisateur inexistant")
      }
      else{
        props.setFilter({});
        props.goUser(); //passage a la page de profil donne par setName
        props.setName(props.filter.filter);
      }
    }
    )
  }
  */
 

  if (props.filter.contact != null){
    if(props.filter.contact){
      try {
      axios.get(baseURL + '/users/' + props.login +'/contacts').then((response)=> {
        //console.log("aaaaaaaaaaaaa", response.data.messages.reverse())
        setMessages(response.data.messages.reverse());
        baseURL = "http://localhost:8000/api/messages";
        props.setFilter({});
      });}
      catch(e){
        console.log(e)
      }
    }
  }

  //console.log("bonjour",bool, messages);

  if (props.filter.message != null){
    if(props.filter.message[0]){
      try {
      axios.get(baseURL2+ `/${props.filter.message}`).then((response)=> {
        //console.log("SEARCH MESSAGES", response.data.message.reverse())
        setMessages(response.data.message.reverse());
        props.setFilter({});
      });}
      catch(e){
        console.log(e)
      }
    }
  }

  if(props.filter.refresh){
    //console.log("on est bel et bien là")
    try{
      axios.get(baseURL).then((response) => {
        setMessages(response.data.messages.reverse());
        props.setFilter({})
      });
    }
    catch(e){
      console.log(e)
    }
  }
  

    return(
        <main className={main.main}>  
          <Aside /*filter={props.filter} refresh={props.setFilter}*/ nbmsg={messages.length}/>
          <section className={main.section}>
            <NewMessage login = {props.login} refresh={props.setFilter}/>
            <article>
              <ul>
                <ListMessage login={props.login} messages={messages}
                goUser={props.goUser} setName={props.setName} setFilter={props.setFilter}/>
              </ul>
            </article>
          </section>
        </main>
    )

}


export default Main;