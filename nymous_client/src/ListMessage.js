import {useState,useEffect} from "react";
import Message from "./Message";
import main from "./main.module.css";

function ListMessage(props){

    const [listmessages,setListMessages] = useState([props.messages]);
    //let listmessages = props.messages
    
    var i = 6727182193
    function message(stuff){
        if (stuff){
            return (<article key={i++} className={main.ul}>
                <Message user={stuff.login} content={stuff.message}
                 idmsg={stuff._id} date={stuff.date} login={props.login} 
                 goUser={props.goUser} setName={props.setName} getalltrue={props.getalltrue}
                 setFilter={props.setFilter} setRefresh={props.setRefresh}/>
            </article>)
        }
    }

    function mapmarchepas(list){
        let list_rev=list.reverse();
        let res = [];
        for(let i = 0; i<list_rev.length;i++){
            res = res.concat((message(list_rev[i])))
        }
        return res;
    }

    //console.log(messages)
    return(
        <div>
            {mapmarchepas(props.messages)}
        </div>
    );
    
}

export default ListMessage;