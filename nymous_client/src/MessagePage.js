import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import User from "./User";
import React from "react";
import axios from "axios";

var bool2 = true

function MessagePage(props){

    var bool = true
    var refresh = false
    const[user, setUser] = useState(false); //bool affiche page pp ou page user
    const[id,setId] = useState(props.login); // nom du compte avec lequel tu es connecté 
    const[filter,setFilter] = useState({})
    const[name,setName]=useState(props.login) // nom du compte affiche lorsque tu clique sur un user qui a poste le msg


    function booltrue(){bool = true;}
    //console.log(self , props.id)
    
    function goSelf(){
        //setDisplay({"user"});
        setName(id);
        setUser(true);//droits supplementaires
    }

    function goUser(){
        setUser(true)
    }

    function goMessagePage(){
        //setDisplay({""})
        if(!user){ setFilter({refresh : true});}
        setUser(false);
        refresh= true
    }

    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
    
    
    async function usersearchmadness(){
        var test = true;
        let prom = "debug";
        if(filter.user){
            try{
                await axios.get(`http://localhost:8000/api/users/exists/${filter.user}`)
                .then( async (response)=>{
                    //console.log("ici",response.data.message)
                    prom = await response.data.message;
                    if(typeof response.data.message === 'undefined'){return}
                    //let test2 = await prom == null
                    //await delay(5000);
                    if(!prom){
                        if(test){
                            //window.confirm("Utilisateur inexistant !");
                            setFilter({});
                            test = false;
                        }
                    }
                    else{
                        setName(filter.user);
                        goUser();
                        setFilter({});
                    }
                }
                    )
                //window.confirm(prom)
            }
            catch(e){
                    console.log(e);
            }
        
        }
    }

    if(filter.user){ usersearchmadness()}

    function AffichageDisplay(){
            return( user ? 
            <User name={name} self={id} filter={filter} 
            setFilter={setFilter} setName={setName} setUser={setUser} logout={props.logout}/> 
            : 
            <Main filter={filter} login={id} setFilter={setFilter} 
            goUser={goUser} setName={setName} bool = {bool} refresh ={refresh}/>
            )};

    return(
        <div>
            <Header lobby={goMessagePage} login={id} setFilter={setFilter} 
            logout={props.logout} self={goSelf} bool ={booltrue}/>
            {AffichageDisplay()}
        </div>
    );
}


export default MessagePage;