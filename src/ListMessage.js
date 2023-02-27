import {useState} from "react";
import Message from "./Message";

function ListMessage(props){
    const [messages,SetMessages] = useState([
        { user : "Malek Bouzarkouna", content :"ah dommage \n vraiment dommage", time: "20-01-1973"},
        { user : "Prométhée Spathis", content :"bonjour", time : "19-12-2022" }]);

    
    
    
    let message ={}
    /*
    return(
        <div>
            { messages.map (( message ) => (
                <Message user={messsage.user} content={message.content} time={message.time} />
            ))
            }
        
        </div>
    );
    */
}

export default ListMessage;