import { useState } from "react";
import accueil from "./accueil.module.css"

function AccueilPage(props){
    return(
        <div className={accueil.div1}>
        <div className={accueil.div2}>
            <h1 className={accueil.h1}>
                Nymous
            </h1>
                <button type="submit" id="login" name="Login" className={accueil.login} onClick={props.page} >
                    Se connecter
                </button>
                <button type="submit" id="identifier" name="Identifier" className={accueil.login} onClick={props.signin}>
                    S'identifier
                </button> 
            </div>
    </div>

    );

}

export default AccueilPage;