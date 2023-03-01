import { useState } from "react";
import Accueil from "./Accueil";
import Login from "./Login";
import Logout from "./Logout";
import Signin from "./Signin";

function NavigationPanel(props){

        const[page, setPage] = useState("accueil");
        const[connected, setConnected] = useState(props.connected)

        function deconnexion(){
            setConnected(false);
            setPage("accueil")
        }

        function connexion(){
            setConnected(true);
            setPage("message_page");
        }

        function goLogin(){
            setPage("login");
        }

        function goSignin(){
            setPage("enregistrer")
        }


        function AffichagePageCourante(){
            switch(page){
                case "accueil": return <Accueil page={goLogin} signin={goSignin}/>;
                case "enregistrer": return <Signin login ={goLogin} />;
                case "login": return <Login login={connexion} signin={goSignin}/>;
                case "message_page": return <Logout PageCourante={setPage} logout={deconnexion}/>;
                default: return <Accueil setPage={setPage}/>
            }
        }
        
        return(
            <div>
                {AffichagePageCourante()}
            </div>
        );
}

export default NavigationPanel;