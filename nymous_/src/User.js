import {useState} from "react"
import Message from "./Message";
import ListMessage from "./ListMessage";
import pageutilisateur from "./pageutilisateur.module.css";

function User(props){

    const[name,setName]=useState("");

    let messages = [
        { user : "Prométhée Spathis", content :"ah dommage \n vraiment dommage", time: "20-01-1973"},
        { user : "Prométhée Spathis", content :"bonjour", time : "19-12-2022" }]

    return(
        <div>
        <header className={pageutilisateur.header}>
            <div id="logo"></div>
            <img id="logo" className={pageutilisateur.logo} src="spthus.jpeg" alt="logo de Spathis"/>
    
            <div className={pageutilisateur.flexbox}>
                Prométhée Spathis
            </div>
            <button className={pageutilisateur.ajout_ami} id="ajout" name="ajout">
                +
            </button>

            <div className={pageutilisateur.contact}>
                Ajouter en contact
            </div>
        </header>

        <main className={pageutilisateur.main}>
            <aside className={pageutilisateur.aside}>
                <p>
                Liste des amis : <br/>
                <br/>
                Malek <br/>
                Roman UwU <br/>
                </p>
            </aside>

            <article>
                <ListMessage messages={messages}/>              
            </article>
        </main>
    </div>
    )
    
}
export default User;