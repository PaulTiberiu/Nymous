import {useState} from "react";
import axios from "axios"
import newmessage from "./newmessage.module.css";

const baseURL = "http://localhost:8000/api/messages/users/user"

function NewMessage(props){


    const [login, setLogin] = useState(props.login); //car dans Main.js on passe a <NewMessage login = {props.login}/>
    const [message,setMessage] = useState("");
    const [post,setPost] = useState();

    let date =  new Date().toLocaleDateString();
        
    function createMessage() {
        axios
             .post(baseURL, {
                login : login,
                message : message,
                date : date
              })
              .then((response) => {
                setPost(response.data);
                window.confirm("message posté")
                props.refresh({refresh : true});
                //props.login();
              });
          }
    


 return (
        <div className={newmessage.new_com_zone}>
            {/*<input class = "new_com" type="text" id="new_comment"name="new_comment"> !*/}
            <textarea  value={message} onInput={e=>setMessage(e.target.value)} className={newmessage.new_com} name="new_comment" required placeholder="New message..."/>
            <button className={newmessage.post_button} id="post" name="post" onClick={createMessage} >Post</button>
        </div>
 );
}

export default NewMessage;