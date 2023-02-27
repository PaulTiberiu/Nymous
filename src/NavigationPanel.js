import { useState } from "react";
import Accueil from "./Accueil";
import Login from "./Login";
import Logout from "./Logout";

function NavigationPanel(props){    
    return(
        <nav id="navigation_pan">
            {(props.connected) ? <Logout logout={props.logout}/> : <Login login={props.login}/>}
        </nav>
    );
}

export default NavigationPanel;