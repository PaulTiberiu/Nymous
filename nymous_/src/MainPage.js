import { useState } from "react";
import NavigationPanel from "./NavigationPanel";
//on n'a pas besoin de mainpage, on peut le mettre dans index
function MainPage(props){

    const [connected,setConnected]=useState(false);
    const [currentpage,setCurrentpage] = useState('accueil');
    
    function getConnected(evt) {
        setConnected(true);
        setCurrentpage('message_page');
    }

    function setLogout(evt){
        setConnected(false);
        setCurrentpage('accueil');
    }

    return(
        <div>
            {<NavigationPanel login={getConnected} logout={setLogout} connected={connected} setpage={setCurrentpage}/>}
        </div>
    );
}

export default MainPage;