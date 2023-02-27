import { useState } from "react";
import Header from "./Header";
import Main from "./Main";


function Logout(props){
    return(
        <div>
            <Header logout={props.logout}/>
            <Main/>
        </div>
    );
}

export default Logout;