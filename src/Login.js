import { useState } from "react";
import logincss from "./logincss.module.css"


function Login(props){
    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");

    const getLogin = (evt) => {setLogin(evt.target.value)}
    const getPassword = (evt) => {setPassword(evt.target.value)}

    return (
        <div>
            <div>
                <h1 className={logincss.session}>
                    Ouvrir une session
                </h1>
            <form className={logincss.form1}>
                <label htmlFor="Login">
                    Login
                </label>
                <input id="login" name="Login" type="text" className={logincss.login}/>
                <label htmlFor="Mot de passe">
                    Mot de passe
                </label>
                <input id="motdepasse" name="Mot de passe" type="password" className={logincss.login}/>
                <a type="submit" className={logincss.oublimdp}>
                    Oublié votre mot de passe?
                </a>
                <button type="submit" className={logincss.connex} onClick={props.login}>
                    Connexion
                </button>
                <a type="submit" className={logincss.enreg} onClick={props.signin}>
                    Pas enregistré?
                </a>
            </form>
            </div>
        </div>
        );
    }

export default Login;