import {useState} from "react";
import newmessage from "./newmessage.module.css";

function NewMessage(props){
 return (
    <div>
        <form method ="post" className={newmessage.new_com_zone}>
            {/*<input class = "new_com" type="text" id="new_comment"name="new_comment"> !*/}
            <textarea className={newmessage.new_com} name="new_comment" defaultValue={""} required placeholder="Nouveau Message"/>
            <button className={newmessage.post_button} id="post" name="post" type="submit">Poster</button>
        </form>
    </div>
 );
}

export default NewMessage;