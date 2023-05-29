import {useState} from "react"
import pageutilisateur from "./pageutilisateur.module.css";
import axios from "axios";

const reqURL = "http://localhost:8000/api/friends/users/request/"
const friendURL = "http://localhost:8000/api/friends/users/"

function Friend(props){

    //console.log("voilà le login mon ptiot",props.login)

    function UserPage(){
        props.setUser(true);
        props.setName(props.name);
    }

    function isrequest(){
        return(<div>
                {props.isrequest ? 
                <button onClick={acceptRequest} className={pageutilisateur.acceptRequest}> + </button>
                :<button onClick={deleteFriend} className={pageutilisateur.deleteFriend}> 🗑 </button>}
            </div>)
    }

    function acceptRequest(){
        try{
            axios.post(`${friendURL}${props.name}`,
            {login : props.login})
            .then((response)=>{
                window.confirm(`${props.name} added to the friends list`);
                props.setRefresh(true)
            })
        }
        catch(e){
            console.error(e)
        }
        
    }
    
    async function deleteFriend(){
        try{
            await axios.delete(friendURL+'user',{data :
                {
                    login1 : props.login,
                    login2 : props.name
                }}).then(async(response)=>{
                    window.confirm(`vous n'êtes plus amis avec ${props.name}`);
                    props.setRefresh(true)});
        }
        catch(e){
            console.error(e)
        }
    }

    let aie = "</div>"
    //console.log("suisje moi meme ????",props.isSelf)
    function optionssupp(){ 
        if(props.isSelf){
            return(isrequest())
        }

    }

    return(
        <div className={pageutilisateur.divdiv}>
            <div key ={props.i} className ={pageutilisateur.list} onClick={UserPage}>   
                {props.name}
            </div>
            {optionssupp()}
        </div>
    )

}

export default Friend