import {useState, useEffect} from "react";
import header from "./header.module.css"
import Recherche from "./Recherche.js"
import axios from "axios";

function Header(props){

    const[login,setLogin] = useState(props.login)

    const BaseURL="http://localhost:8000/api/users/user/logout";

    function FermerSession(){
        /*
        axios
            .delete(BaseURL)
            .then(async (response) => {
                props.logout();
            });
            */
        document.cookie = "token = "
        props.logout();
    }



    return(
            <header className={header.header}>
                <h1 className={header.h1} onClick={props.lobby}>
                🅽🆈🅼🅾🆄🆂
                </h1>
                <Recherche login = {login} setFilter = {props.setFilter}/>
                <div className={header.case_login}>
                    <a type="submit" className={header.connex_enreg} onClick = {props.self}>
                        Profile 
                    </a>
    
                    <a type="submit" className={header.connex_enreg} onClick={FermerSession}>
                        Logout
                    </a>
                </div>
            </header>
    );
}

export default Header;