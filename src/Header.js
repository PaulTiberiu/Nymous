import {useState} from "react";
import logo3 from "./logo3.png"
//import prototype from "./prototype.module.css"
//<img id="logo" className="logo" src={logo3} alt="logo de Nymous"/> à remettre

function Header(props){
    return(
        <div>
            <header>
            <div id="logo"></div>
            <h1>Nymous</h1>
    
            <input className="recherche" type="text" name="recherche" id="" placeholder="recherche" required/>
    
            <input type="image" className="search" src="search.png"/>
            
            <input type="checkbox" id="contact" name="contact" className="contact"/>
            <div className="contact_label">
                    Contact only
            </div>
    
            <div className="case_login">
                <a type="submit" className="connex_enreg">
                    Page d'utilisateur
                </a>
    
                <a type="submit" href = 'enregistrer.html' className="connex_enreg" onClick={props.logout}>
                    Logout
                </a>
            </div>
            </header>
        </div>
    );
}

export default Header;