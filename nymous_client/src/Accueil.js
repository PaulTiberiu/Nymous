import { useState } from "react";
import accueil from "./accueil.module.css"
import Signin from "./Signin";
import AccueilPage from "./AccueilPage";

function Accueil(props){

    const[signin, setLogin] = useState("");
    const[signup, setSignUp] = useState("accueil");


    function getLogin(evt) {
        setLogin(true);
        setLogin('login');
    }

    function getSignUp(evt){
        setSignUp(true);
        setSignUp('enregistrer');
    }

    return ( 
        <div>
            {
            <AccueilPage page={props.page} signin={props.signin}/>
            }
        </div>
    );
}

export default Accueil;
