import {useState, useEffect} from "react";
import message from "./message.module.css"
import axios from "axios";


function Message(props){

    const[idmsg,setIdmsg]=useState(props.idmsg);
    const[user,setUser]=useState(props.user);
    const[content,setContent]=useState(props.content);
    const[mtime,setmTime]=useState(props.date);
    const[login,setLogin]=useState(props.login);
    const[post, setPost]=useState();
    const[image, setImage]=useState();

    let baseURL = "http://localhost:8000/api/messages/users/user"

    function options(){
        return(props.user !== login ? <div/> :
        <div className={message.div_options}> 
            <button className={message.corbeille} onClick={Delete_Message}> 🗑 </button>
            <button className={message.edit} onClick={Edit}> Edit </button>
        </div>)
    }

    
    async function Edit(){
        var edit = window.prompt("Edit your message");
        console.log(edit)
        axios.put(baseURL,{
            _id : {
                $oid : props.idmsg
            },
            message : edit,
            login: props.login
         }
        ).then((response) => {
            console.log("edit envoyé")
            setPost(response.data.message);
            if(props.setFilter){props.setFilter({refresh:true});}
            if(props.setRefresh){props.setRefresh(true);}
          }) 
    }

    function Delete_Message(){
        axios
             .delete(baseURL, {data : {
                _id : {$oid:props.idmsg},
                login : props.login //a gauche objet requete, a droite etat
                }})
              .then((response) => {
                setPost(response.data.message);
                if(props.setFilter){props.setFilter({refresh:true});}
                if(props.setRefresh){props.setRefresh(true);}
                window.confirm("Message deleted");
              })
    }

    function UserPage(){
        props.goUser(); //passage a la page de profil donne par setName
        props.setName(props.user);
        //props.getalltrue();
    }

    async function loadImage() {
        //console.log("oui je charge")
        axios
            .get(`http://localhost:8000/api/images/${props.user}`)
            .then((response) => {setImage(`${response.data.url.url}?${Date.now()}`)});
    }

    useEffect(() => {
        loadImage();
    }, []);

    if(user!=props.user){
        loadImage();
        setUser(props.user)
    }


    return(
        <div>
            <div className={message.div}>
                <img src={image} className={message.photo}/>
                <h3 className={message.h3}>
                    <div onClick={UserPage} className={message.text}>
                        {props.user}
                    </div>
                    {options()}
                </h3>
            </div>
                
                <ul>
                    {props.content}
                </ul>
                <time dateTime = {mtime} className={message.date}>
                    {mtime}
                </time>
        </div>
    )
}

export default Message;