
import { useState } from "react";
import accueil from "./accueil.module.css"
import background2 from "./background2.jpg"
import Signin from "./Singin";
import AccueilPage from "./AccueilPage";

function Accueil(props){

    const[signin, setLogin] = useState("");
    const[signup, setSignUp] = useState("acceuil");

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
            {(signup === "acceuil") ? <AccueilPage page={props.page} signin = {getSignUp}/> : <Signin login={props.page} /> }
        </div>
    );
}

export default Accueil;
