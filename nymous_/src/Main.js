import {useState} from "react"
import ListMessage from "./ListMessage"
import main from "./main.module.css";
import Aside from "./Aside";
import NewMessage from "./NewMessage";

function Main(props){

  let date =  new Date().toLocaleDateString() 

  let messages = [
    { user : "Malek Bouzarkouna", content :"ah dommage \n vraiment dommage", time: "20-01-1973"},
    { user : "Prométhée Spathis", content :"bonjour", time : "19-12-2022" },
    { user : "Ronaldo", content:"SIIIIIIIIIIIIUUUUUUUUUUUUUU" , time: date}];

    return(
        <main className={main.main}>
          <Aside/>
          <section>
            <NewMessage/>
            <article>
              <ul>
                <ListMessage messages={messages}/>
              </ul>
            </article>
          </section>
        </main>
    )

}

export default Main;