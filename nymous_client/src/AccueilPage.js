import { useState } from "react";
import accueil from "./accueil.module.css"

function AccueilPage(props){
    return(
        <div className={accueil.div1}>
            <h1 className={accueil.h1}>
                Welcome to 🅽🆈🅼🅾🆄🆂
            </h1>
                <button type="submit" id="login" name="Login" className={accueil.login} onClick={props.page} >
                    Sign in
                </button>
                <button type="submit" id="identifier" name="Identifier" className={accueil.login} onClick={props.signin}>
                    Sign up
                </button> 
        </div>

    );

}

export default AccueilPage;