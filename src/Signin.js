import {useState} from "react"
import signin from "./signin.module.css"

function Signin(props){

    return(
    <div>
        <header>
            <h1 className={signin.h1}>
                Enregistrement
            </h1>
        </header>
        <form className={signin.form1}>
            <label htmlFor="Prenom">
                Prénom
            </label>
            <input id="prenom" name="Prénom" type="text" className={signin.nom}/>
            <label htmlFor="Nom">
                Nom
            </label>
            <input id="nom" name="Nom" type="text" className={signin.nom}/>
            <label htmlFor="Mail">
                Adresse mail
            </label>
            <input id="mail" name="Mail" type="text" className={signin.nom}/>
            <label htmlFor="Login">
                Login
            </label>
            <input id="login" name="Login" type="text" className={signin.nom}/>
            <label htmlFor="Mot de passe">
                Mot de passe
            </label>
            <input id="motdepasse" name="Mot de passe" type="password" className={signin.nom}/>
            <label htmlFor="Retapez">
                Retapez
            </label>
            <input id="retapez" name="Retapez" type="password" className={signin.nom}/>
            <button type="submit" className={signin.enreg} onClick={props.login}>
                Enregistrer
            </button>
        </form>
    </div>
        
    )
}

export default Signin;