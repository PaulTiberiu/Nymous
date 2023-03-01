import {useState} from "react"
import Message from "./Message";

function User(props){

    const[name,setName]=useState("");
    

    return(
        <div>
             <body>
        <header>
            <div id="logo"></div>
            <img id="logo" className="logo" src="spthus.jpeg" alt="logo de Spathis"/>
    
            <div className="flexbox">
                Prométhée Spathis
            </div>
            <button className="ajout_ami" id="ajout" name="ajout">
                +
            </button>

            <div className="contact">
                Ajouter en contact
            </div>
        </header>

        <main>
            <aside>
                <p>
                Liste des amis : <br/>
                <br/>
                Malek <br/>
                Roman UwU <br/>
                </p>
            </aside>

            <article>
                <ul>
                    <li>
                        <Message user="SPATHOS" content ="SPATHUS" time = "27-20-18"/>
                    </li>
                </ul>
            </article>
        </main>
        </body>
        </div>
    )

}

export default User