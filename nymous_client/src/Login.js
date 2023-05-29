import { useState } from "react";
import logincss from "./logincss.module.css";
import axios from "axios";
import React from "react";
import Cookies from 'js-cookie'

const baseURL = "http://localhost:8000/api/users/user/login"


function Login(props){
    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");
    const[post,setPost] =useState();

    function GoLogin() {
        //console.log(login);
        //console.log(password);
    
        axios
             .post(baseURL, {
                login : login, //a gauche objet requete, a droite etat
                mdp : password
                },{withCredentials : true})
              .then((response) => {
                //console.log("voici le cookie",Cookies.get());
                setPost(response.data);
                props.login(login);
                document.cookie = `token=${response.data.token}`
              })
    }
    
    return (
        
        <div className={logincss.div}>
            <h1 className={logincss.h1}>
                Sign in
            </h1>
            <div className={logincss.form1}>
                <label htmlFor="Login">
                    Username
                </label>
                <input id="login" name="Login" type="text" className={logincss.login} value={login} onInput={e=>setLogin(e.target.value)}/>
                <label htmlFor="Mot de passe">
                    Password
                </label>
                <input id="motdepasse" name="Mot de passe" type="password" className={logincss.login} value={password} onInput={e=>setPassword(e.target.value)}/>
                <button type="submit" className={logincss.connex} onClick={GoLogin}>
                    Connect
                </button>
                <a type="submit" className={logincss.enreg} onClick={props.signin}>
                    You don't have an account? Sign up now!
                </a>
            </div>
        </div>
        );
    }

export default Login;