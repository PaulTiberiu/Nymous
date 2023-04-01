import {useState} from "react";
import logo3 from "./logo3.png"
import header from "./header.module.css"
import Recherche from "./Recherche.js"

function Header(props){
    return(
        <div>
            <header className={header.header}>
                <img id="logo" className={header.logo} src={logo3} alt="logo de Nymous"/>
                <Recherche/>
                <div className={header.case_login}>
                    <a type="submit" className={header.connex_enreg} onClick = {props.self}>
                        Page d'utilisateur
                    </a>
    
                    <a type="submit" className={header.connex_enreg} onClick={props.logout}>
                        Logout
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Header;