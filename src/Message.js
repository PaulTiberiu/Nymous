import {useState} from "react"
import message from "./message.module.css"

function Message(props){

    const[user,setUser]=useState(props.user);
    const[content,setContent]=useState(props.content);
    const[mtime,setmTime]=useState(props.date);

    return(
        <div>
                <h3>
                    {user}
                    <button className={message.add_contact} id="add_contact" name="add">+</button>
                </h3>
                <quote>
                    {content}
                </quote>
                <time dateTime = {mtime}>
                    {mtime}
                </time>
        </div>
    )
}

export default Message;