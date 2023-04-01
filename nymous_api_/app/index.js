const express = require ('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {MongoClient} = require('mongodb');
//const Users = require("./entities/users.js");


let users = []

let id_user = 0;

const router = express.Router();

const app = express();
const port = 8000;

router.use(express.json());

app.use(cookieParser());
app.set('trust proxy', 1);

app.use(session({secret: 'feur', name : 'sessionid'}));
const urldb = "mongodb://localhost:27017/"
const client = new MongoClient(urldb);




app.use((req, res, next) => {
// cookie-parser initialise req.cookies
    //let req.session_id = req.cookies.session_id;
    if (req.session_id === undefined) {
        const options = {expires: new Date(Date.now() + 5*3600)}
        //req.session_id = session_uid_gen()
        res.cookie("session_id", req.session_id, options) // cookie expire apres 5 minutes
    }
    next();
})

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.send("Serveur à l'écoute");
})
//creation user
.put('/api/users/user', (req, res) =>{
    // Pour plus de lisibilité, on peut aussi définir const{...}=req.body
    const {prenom, nom, mail, login, mdp, mdp_bis}=req.body;
    try {
        if ((!req.body.prenom) || (!req.body.nom) || (!req.body.mail) || (!req.body.login) || (!req.body.mdp) || (!req.body.mdp_bis)) { //si req.body.name == NULL donc champ vide
            res.status(400).json({
                status: 400,
                "message": "Requête invalide"
            });
            return;
        }
        if(req.body.mdp != req.body.mdp_bis){
            res.status(400).json({
                status: 400,
                "message": "Requête invalide: le mot de passe doit etre le meme"               
            });
            return;
        }
        //if(req.body.login) a tester si user existe deja 409 erreur et renvoyer un json 
        //tester si adresse mail bon format
        console.log(req.body.nom);
        console.log(req.body.prenom);
        console.log(req.body.mail);
        console.log(req.body.login);
        console.log(req.body.mdp);
        console.log(req.body.mdp_bis);
        id_user++; // sinon avec mongoDB
        NewUser.push(req.body)
        /*
        client.db("nymous");
        const col1 = await client.db("nymous").collection("users");
        const res1 = await client.db("nymous").collection("users").insertOne(NewUser);
        */

        res.json({id: id_user,
                message: "hello user_id: "+id_user,
                status: 201});
        res.end();
    }
    catch (e) {
        // Toute autre erreur
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})


//login + cookie
.get('/api/users/login',(req,res)=>{
    const {login,password}=req.body;
    try{
        if((!req.body.login)||(!req.body.password)){
            res.status(400).json({
                status: 400,
                "message": "Requête invalide"
            });
            return;
        }
        /*utilisateur absent de la DB => erreur 401*/ 
        /* mauvais mot de passe => erreur 401*/
        const log = "Spathis";
        const pwd = "Tac0s";

        if(login!=log){
            res.status(401).json({
                status: 400,
                "message": "mauvais utilisateur"
            })
        }
        
        if(password!=pwd){
            res.status(401).json({
                status: 400,
                    "message": "mauvais mot de passe"
                })
        }

        res.json({id: log,
            message: "hello user: "+log,
            status: 200});
        res.end();
    }
        
    catch(e){
        // Toute autre erreur
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})
//a tester!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//logout
.delete('/api/users/user/userid/logout',(req,res)=>{
    try{
        if (req.session) {
            req.session.destroy(err => {
              if (err) {
                res.status(401).json({message:"Unable to logout: utilisateur n'existe pas",
                                    status: 401,
                                    })
              } else {
                res.send.json({message:'Session fermee',
                            status: 200})
              }
            });
        }
        else{
            res.end();
        }
    }

    catch(e){
        // Toute autre erreur
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//getUser
/*.get('/api/users/userid',(req,res)=>{
    
})
*/

//deleteuser pareil avec Mongo,il faut recuperer userid
.delete('/api/users/user/:id',(req,res)=>{
    const usrid= req.params.id;//faut recuperer avec MongoDB
    try{
        if (usrid==1) {
            res.status(200).json({
                status:200,
                message: "user enleve",
                user: usrid
            })
        }
        else{
            res.status(400).json({
                message : "user don't exist"
            })
            res.end();
        }
    }

    catch(e){
        // Toute autre erreur
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//creer message
.post('/api/messages/users/user/:id/messages',(req,res)=>{
    const {message} = req.body;
    id_user = req.params.id;
    try{

        if(message === ""){
            res.status(400).json({
                status : 400,
                "message" : "requete invalide, message vide"
            });
            return;
        }

        /*vérifier que l'utilisateur existe */
        

        else{
            res.json({id: id_user,
                message: "message posté",
                status: 201});
            NewMessage = {
                author: req.params.id,
                message: message,
                date: new Date(Date.now())
            };
            res.end();
        }
        console.log(message)
    }
    /*
    client.db("nymous");
    const col1 = await client.db("nymous").collection("messages");
    const res1 = await client.db("nymous").collection("messages").insertOne(NewMessage);
    */

    
    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//set message
.put('/api/messages/users/user/:id/messages',(req,res)=>{
    const {message,id_user} = req.body;
    try{

        if(message === ""){
            res.status(400).json({
                status : 400,
                "message" : "requete invalide, message vide"
            });
            return;
        }

        if(req.params.id != id_user){
            res.status(401).json({
                "message " : "Unauthorized vous n'êtes pas l'auteur de ce message"
            })
        }
        /*vérifier que l'utilisateur existe */
        /*vérifier que le message existe  */
        /*modifier le message */

        else{
            res.json({id: id_user,
                message: "message posté",
                status: 201});
        res.end();
        }
        console.log(message)
    }

    
    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//delete message
.delete('/api/messages/user/user:id/messages',(req,res)=>{
    const {message} = req.body;
    try{

        if(message === ""){
            res.status(400).json({
                status : 400,
                "message" : "requete invalide, message vide"
            });
            return;
        }

        /*vérifier que l'utilisateur existe */
        /*vérifier que le message existe  */
        /*supprimer le message */

        else{
            res.json({id: id_user,
                message: "message posté",
                status: 201});
        res.end();
        }
        console.log(message)
    }

    
    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//create friend
.put('/api/friends/user/user:id/friends',(req,res)=>{
    const {login} = req.body
    /* tester si user existe bdd */
    try{
        if(!login){
            res.status(400).json({
                status: 400,
                "message": "Requête invalide"
            });
            return;
        }
        /*utilisateur absent de la DB => erreur 401*/
        /*avec le user:id on recupere le user de la bdd et son login*/ 
    
        const log = "Spathis"; 

        if(login==log){
            res.status(401).json({
                status: 400,
                "message": "meme utilisateur: on ne peut pas se suivre nous memes"
            })
        }

        res.json({id: req.params.id,
            message: "je suis ami avec: "+log,
            status: 200});
        res.end();
    }
        
    catch(e){
        // Toute autre erreur
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.status(404).send("Cette page n'existe pas.");
});

app.use('/', router);

    app.listen(port, function() {
        console.log('Le serveur écoute le port '+port);
});



