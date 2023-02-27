import {useState} from "react"
import ListMessage from "./ListMessage"

function Main(props){

    return(
        <main>
        <aside>
          <p>
            Nombre 1 : 10153517631 
            Nombre 2 : 2~3 
            zyuezyzzuuzu
            au
            aadafia
            fiaf
            ajhahjajhfa
            jhefjhe
            fjhefjhzjhzj
            hzejhzefjhef
            agafguzefug
            zegzgzefgefgze
            fgefgefg
            adzguguda
            zguguagga
            iidgfiu
          </p>
        </aside>
        <section>
          <div className="new_com_zone">
            <label htmlFor="new_comment"> Nouveau Commentaire: </label> 
            {/*<input class = "new_com" type="text" id="new_comment"name="new_comment"> !*/}
            <textarea className="new_com" name="new_comment" cols={50} rows={8} defaultValue={""} />
            <button className="post_button" id="post" name="post">Poster</button>
          </div>
          <article>
            <ul>
              <ListMessage/>
            </ul>
          </article>
        </section>
      </main>
    )

}

export default Main;