import { useState, useEffect } from "react";
import Accueil from "./Accueil";
import Login from "./Login";
import MessagePage from "./MessagePage";
import Signin from "./Signin";
import axios from "axios";
import {Cookies} from "react-cookie"
import {useCookies} from "react-cookie"

function NavigationPanel(props){

        const[page, setPage] = useState("accueil");
        const[connected, setConnected] = useState(props.connected);
        const[login,setLogin]= useState("");
        const [cookies] = useCookies();

        const BaseURL="http://localhost:8000/api/users/user/login";
        
        useEffect(() => {
            axios
                .get(BaseURL,{
                    headers : {
                        Authorization : `${cookies.token}`
                    }
                })
                .then(async (response) => {
                    console.log(response.data);
                    if(response.data.logged){
                        connexion(response.data.login);
                    }
                });
        },[]);
    

        function deconnexion(){
            setConnected(false);
            setPage("accueil");
            setLogin("")
            //document.getElementsByTagName("body")[0].addClass("connected"+setConnected);
        }



        function connexion(login){
            setLogin(login);
            console.log("je suis connecté en tant que",login);
            setConnected(true);
            setPage("message_page");
            //document.getElementsByTagName("body")[0].addClass("connected"+connected);
        }

        function goLogin(){
            setPage("login");
        }

        function goSignin(){
            setPage("enregistrer");
        }

        function AffichagePageCourante(){
            switch(page){
                case "accueil": return <Accueil page={goLogin} signin={goSignin}/>;
                case "enregistrer": return <Signin login={goLogin} />;
                case "login": return <Login login={connexion} signin={goSignin}/>;
                case "message_page": return <MessagePage login = {login} PageCourante={setPage} logout={deconnexion}/>;
                default: return <Accueil setPage={setPage}/>;
            }
        }
        
        return(
            <div>
                {AffichagePageCourante()}
            </div>
        );
}

export default NavigationPanel;