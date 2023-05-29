import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";
import aside from "./aside.module.css";

function Aside(props){
  
    //let BaseURL = "http://localhost:8000/api/stats";
    let nb = props.nb_msg;
    const[post_msg, setPostMsg]=useState();
    const[post_user, setPostUsr]=useState();
    const[post_new, setPostNew]=useState();
    const[post_old, setPostOld]=useState();

    let BaseURL = "http://localhost:8000/api/stats";
    
    async function Stats() {
        axios
            .get(BaseURL)
            .then((response) => {
                setPostUsr(response.data.nb_users);
                setPostMsg(response.data.nb_msg);
                setPostNew(response.data.new);
                setPostOld(response.data.old);
            });
    }
    
    useEffect(() => {
        Stats();
    },[nb]);
    

    return(
        <div className={aside.div}>
            <p className={aside.p_p}>
                Statistics:
            </p>
            <p className={aside.p}>
                Number of posted messages: {post_msg}   
            </p>
            <p className={aside.p}>
                Number of displayed messages: {props.nbmsg}   
            </p>
            <p className={aside.p}>
                Number of users: {post_user}
            </p>
            <p className={aside.p}>
                Newest User: {post_new}
            </p>
            <p className={aside.p}>
                First User: {post_old}
            </p> 
        </div>
    )

}

export default Aside;