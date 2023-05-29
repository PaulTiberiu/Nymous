import {useState} from "react";
import header from "./header.module.css";
import search from "./search.png"
import friend from "./friend.png";

function Recherche(props){

    const[contact,setContact]= useState(false);
    const[filtre,setFiltre]=useState("");
    const[searchUser,setSearchUser]=useState(false)

    function togglecontact(){
        props.setFilter({contact:true});
    }


    function toggleUser(){
        setSearchUser(!searchUser)
    }
    function filter(){

        //console.log(contact,filtre);

        if(searchUser){
            props.setFilter(
                {
                user : filtre
                })
        }
        else{
            props.setFilter(
                {
                message : filtre
                }                
            )
        }
    }

    return(
        <div className={header.recherche}>
            <input type="text" className={header.barre} name="recherche" id="" placeholder="search..." onInput={e=>setFiltre(e.target.value)} value={filtre} /*required*//>
            <button className={header.search} type="submit" onClick={filter}>
                <img src={search} className={header.image} type="submit"/>
            </button>
            <input type="checkbox" id="user" name="user" className={header.contact_label} onClick={toggleUser}/>
            <label htmlFor="user" className={header.label}>
                Search user
            </label>
            <button id="contact" name="contact" className={header.contact_only} onClick={togglecontact}>
                <img src={friend} className={header.image} type="submit"/>
            </button>
            <label htmlFor="contact" className={header.label}>
                Contacts only
            </label>
        </div>
    );

}

export default Recherche;