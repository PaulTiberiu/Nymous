import {useState,useEffect} from "react";
import Message from "./Message";

function ListMessage(props){
    let date =  new Date().toLocaleDateString() 
    const [messages,SetMessages] = useState(props.messages);
    
    return(
        <div>
            {messages.map((stuff,index) => (
                <li>
                    <Message user={stuff.user} content={stuff.content} date={stuff.time} />
                </li>
            ))
            }
        
        </div>
    );
    
}

export default ListMessage;