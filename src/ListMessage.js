import {useState} from "react";
import Message from "./Message";

function ListMessage(props){
    let date =  new Date().toLocaleDateString() 
    const [messages,SetMessages] = useState([
        { user : "Malek Bouzarkouna", content :"ah dommage \n vraiment dommage", time: "20-01-1973"},
        { user : "Prométhée Spathis", content :"bonjour", time : "19-12-2022" },
        { user : "Ronaldo", content:"SIIIIIIIIIIIIUUUUUUUUUUUUUU" , time:date}]);

    let message ={}
    
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