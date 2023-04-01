import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import User from "./User";


function MessagePage(props){

    const[self, setSelf] = useState(false);
    
    function goUser(){
        //setDisplay({"user"});
        setSelf(true);//droits supplementaires
    }

    function goMessagePage(){
        //setDisplay({""})
        setSelf(false);
    }

    function AffichageDisplay(){
            return( self ? <User self={self}/> : <Main/>);
        }

    return(
        <div>
            <Header logout={props.logout} self={goUser}/>
            {AffichageDisplay()}
        </div>
    );
}


export default MessagePage;