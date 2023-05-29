import {useState} from "react"
//import Message from "./Message";
import ListMessage from "./ListMessage";
import Upload from "./Upload";
import pageutilisateur from "./pageutilisateur.module.css";
import React from "react";
import axios from "axios";
import Friend from "./Friend";

const baseURL = "http://localhost:8000/api/messages/users";
const baseURL2 = "http://localhost:8000/api/friends/users";
const baseURL3 ="http://localhost:8000/api/users/user"



function User(props){

    var bool = true

    const[name,setName]=useState(props.name);
    const[messages,setMessages] = useState([]);
    const[login,setLogin] = useState(props.self);
    const[friends,setFriends] = useState([]);
    const[requests,SetRequests]=useState([])
    const[refresh,setRefresh]=useState(false)
    const[imageIds, setImageIds] = useState();

    let self = login == props.name
    
    
    React.useEffect(()=> {
        axios.get((`${baseURL}/${props.name}`)).then((response) => {
          if(response.data.message_id)
          setMessages(response.data.message_id.reverse());
          
        });
        if(self){
          if(bool){
            bool=false
            axios.get(("http://localhost:8000/api/friends/users/request/"+props.self)).then(
              async (response)=>{
                try{
                  let res = await response.data.message
                  //console.log("ah oui d'accord carrément",res)
                  SetRequests(res)
                }
                catch(e){
                  console.error(e)
                }
              }
            )
          }
        }
        axios.get((`${baseURL2}/${props.name}`)).then((response) => {
          console.log("voici mes amis :)",response.data.amis)
          if(response.data.amis)setFriends(response.data.amis);
        });
      }, []);

     

    function Delete_User(){
        axios
             .delete(baseURL3, {data : {
                login : login //a gauche objet requete, a droite etat
                }})
              .then((response) => {
                document.cookie = "token = "
                props.logout();
                window.confirm("Utilsateur supprimé");

              })
    }

    function options(){
        //console.log("huh", props.user === props.login,props.name,props.login);
        return(props.name === props.self ?
        <div>
           <button className={pageutilisateur.ajout_ami} id="delete" name="delete" onClick={Delete_User}> 🗑 </button>
           <label className={pageutilisateur.contact}>
                    Delete account
           </label>
        </div>:
        <div> 
            <button className={pageutilisateur.ajout_ami} id="ajout" name="ajout" onClick={sendrequest}> + </button>
            <label className={pageutilisateur.contact}>
                    Add friend
            </label>
        </div>)
    }

    async function sendrequest(){
        try{
          await axios.put("http://localhost:8000/api/friends/users/request/"+props.name,
          {login : props.self}).then(response=>{
            window.confirm(response.data.message)
            console.log(`moi : ${props.self} a envoyé une demande d'ami à ${props.name}`)
          })
        }
        catch(e){
          console.log(e)
        }
      }

      function ListFriends(){
        let i = 990109191;
        //console.log("voilà les requetes",requests)
        if(friends)
        return(
            <div>
                {friends.map((stuff,index) => (
                    <div key={i}>
                      <Friend name={stuff} login={login} isrequest={false} 
                      setUser={props.setUser} setName={props.setName}
                      setRefresh={setRefresh} isSelf={self} i={i+=2}/>
                    </div>
                ))
                }
            </div>
        );
        //</Friend name=stuff login=props.login key={i++} isrequest=false goUser={props.goUser} setName={props.setName}>
    }

    function ListRequests(){
      if (self){
        let i =718;
        if(requests)
        return(
          <div>
            <div className={pageutilisateur.friend_list}>
                            Friend Requests:
            </div>
            <div>
                {requests.map((stuff,index) => (
                    <div key={i*=2}>
                      <Friend name={stuff} login={login} isrequest={true} 
                      setUser={props.setUser} setName={props.setName}
                      setRefresh={setRefresh} isSelf={self} i={i+=2}/>
                    </div>
                ))
                }
            </div>
          </div>
        )
      }
    }

    //console.log(login,props.name,login===props.name)

    /*  React.useEffect(()=> {
        axios.get((`${baseURL2}/${props.name}`)).then((response) => {
          //console.log(response.data.amis)
          setFriends(response.data.amis);
        });
      }, []);
    */

      function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
    if(props.name != name || refresh){
      try{
        axios.get((`${baseURL}/${props.name}`)).then(async(response) => {
          let res = await response.data.message_id;
          if(res){
            setMessages(res.reverse());
          }
          else{setMessages([])}
        });

        

        if(self){
          axios.get(("http://localhost:8000/api/friends/users/request/"+props.self)).then(
            async (response)=>{
              try{
                let res = await response.data.message;
                SetRequests(res);
              }
              catch(e){
                console.error(e);
              }
            }
          )
        } 

        axios.get((`${baseURL2}/${props.name}`)).then( async (response) => {
          setFriends(await response.data.amis);
          //console.log("test1",friends);
        });

        delay(750);

        setName(props.name);
        setRefresh(false);
        //console.log("test2",friends);
        

        
      }
      catch(e){}
    }

    //fct pour load image
    /*
    const loadImages = async () => {
      try{
        const res =  await fetch('/api/images');//liste public id images
      }
      catch(error){
        console.error(error);
      }
    }
    */
    
    
    return(
        <div>
            <div className={pageutilisateur.header}>
                <Upload login={props.self} name={props.name} self={self}
                refresh={refresh} setRefresh={setRefresh} /*className={pageutilisateur.logo}*//>
                <div className={pageutilisateur.nom_user}>
                    {props.name}
                </div>
                {options()}
                </div>

            <main className={pageutilisateur.main}>
                <aside className={pageutilisateur.aside}>
                    <div className={pageutilisateur.friend_list}>
                        Friend List:
                    </div>
                    {ListFriends(friends)}
                    
                    {ListRequests()}
                </aside>

                <ul key={14141414} className={pageutilisateur.article}>
                        <ListMessage login={login} messages={messages} setRefresh={setRefresh}/>
                </ul>
            </main>
        </div>
    )
    
}
export default User;