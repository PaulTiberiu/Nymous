import {useState} from "react";
import logo3 from "./logo3.png"
import header from "./header.module.css"
function Header(props){
    return(
        <div>
            <header className={header.header}>
                <img id="logo" className="logo" src={logo3} alt="logo de Nymous"/>
                <div id="logo"></div>
                <h1 className={header.h1}>Nymous</h1>
    
                <input className={header.recherche} type="text" name="recherche" id="" placeholder="recherche" required/>
    
                <input type="image" className={header.search} src="search.png"/>
            
                <input type="checkbox" id="contact" name="contact" className={header.contact_label}/>
                <div className={header.contact_label}>
                    Contact only
                </div>
    
                <div className={header.case_login}>
                    <a type="submit" className={header.connex_enreg}>
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