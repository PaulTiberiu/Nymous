import { useState } from "react";
import NavigationPanel from "./NavigationPanel";
import Accueil from "./Accueil"


function MainPage(props){

    const [connected,setConnected]=useState(false);
    //const [connected,setConnected]=useState(props.connected);
    const [currentpage,setCurrentpage] = useState('accueil');
    //const [currentpage,setCurrentpage] = useState(props.currentpage
    function getConnected(evt) {
        setConnected(true);
        setCurrentpage('message_page');
    }

    function setLogout(evt){
        setConnected(false);
        setCurrentpage('accueil');
    }

    function goLogin(evt){
        setCurrentpage("login");
    }

    /*function AffichagePageCourante(page){
        switch(connected){
            case "accueil": return 
        }

    }*/
    return(
        <div>
           {(currentpage === "accueil") ? <Accueil page={goLogin} login={getConnected}/> 
           : <NavigationPanel login={getConnected} logout={setLogout} connected={connected} setpage={setCurrentpage}/>
        }
        </div>
    );
}

export default MainPage;