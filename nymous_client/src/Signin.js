import {useState} from "react"
import axios from "axios"
import signin from "./signin.module.css"
import React from "react"

const baseURL = "http://localhost:8000/api/users/user";

function Signin(props){

    const [nom,setNom] = useState(""); 
    const [prenom,setPrenom] = useState("");
    const [mail,setMail] = useState("");
    const [login,setLogin] = useState("");
    const [mdp,setMdp] = useState("");
    const [mdp_bis,setMdpbis] = useState("");
    const [post,setPost] =useState();

    function createUser() {
    axios
         .put(baseURL, {
          nom : nom, //a gauche objet requete, a droite etat
          prenom : prenom,
          mail : mail,
          login : login,
          mdp : mdp,
          mdp_bis : mdp_bis,
          })
          .then((response) => {
            setPost(response.data);
            //console.log(post)
            props.login();
          });
    }

    return(
    <div>
        <header>
            <h1 className={signin.h1}>
                Sign Up
            </h1>
        </header>
        <div className={signin.form1}>
            <label htmlFor="Prenom">
                First Name
            </label>
            <input id="prenom" name="Prénom" type="text" className={signin.nom} value={prenom} onInput={e=>setPrenom(e.target.value)}/>
            <label htmlFor="Nom">
                Last Name
            </label>
            <input id="nom" name="Nom" type="text" className={signin.nom} value ={nom} onInput={e=>setNom(e.target.value)} />
            <label htmlFor="Mail">
                Mail adress
            </label>
            <input id="mail" name="Mail" type="text" className={signin.nom} value ={mail} onInput={e=>setMail(e.target.value)}/>
            <label htmlFor="Login">
                Username
            </label>
            <input id="login" name="Login" type="text" className={signin.nom} value ={login} onInput={e=>setLogin(e.target.value)} maxLength="15"/>
            <label htmlFor="Mot de passe">
                Password
            </label>
            <input id="motdepasse" name="Mot de passe" type="password" className={signin.nom} value ={mdp} onInput={e=>setMdp(e.target.value)}/>
            <label htmlFor="Retapez">
                Verify password
            </label>
            <input id="retapez" name="Retapez" type="password" className={signin.nom} value ={mdp_bis} onInput={e=>setMdpbis(e.target.value)}/>
            <button type="submit" className={signin.enreg} onClick={createUser}>
                Sign up
            </button>
        </div>
    </div>
        
    )
}

export default Signin;