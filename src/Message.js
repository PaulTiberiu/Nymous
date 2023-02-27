import {useState} from "react"

function Message(props){

    const[user,setUser]=useState(props.user);
    const[content,setContent]=useState(props.content);
    const[time,setTime]=setTime(props.date);

    return(
        <div>
        <li>
        <h3>
            {user}
        </h3>
        <button className="add_contact" id="add_contact" name="add">+</button>
        <quote>
            {content}
        </quote>
        <time dateTime={time}>
            {time}
        </time>
        </li>
        </div>
    )
}

export default Message;