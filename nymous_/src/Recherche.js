import {useState} from "react";
import header from "./header.module.css";

function Recherche(props){

    const[contact,setContact]= useState(false);

    function togglecontact(){
        setContact(!contact);
    }

    return(
        <form method ="post" className={header.recherche}>
            <input type="text" className={header.barre} name="recherche" id="" placeholder="recherche" required/>
    
            <button className={header.search}/>

            <input type="checkbox" id="contact" name="contact" className={header.contact_label} onClick={togglecontact}/>
            <label className={header.contact_label} htmlFor="contact">
                Contact only
            </label>
        </form>
    );

}

export default Recherche