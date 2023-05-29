const express = require ('express');
var session = require('express-session');
//const cookieParser = require('cookie-parser');
const {MongoClient} = require('mongodb');

const Users = require("./Users.js");
const Messages = require("./Messages.js");
const Friends = require("./Friends.js");
const Statistiques = require("./Statistiques.js");
const cors = require('cors');
const {cloudinary} = require('./cloudinary.js');//Images Profil

//var cookieSession = require ('cookie-session');
const MemoryStore = require('memorystore')(session);

const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');

const jwtMiddleware = expressjwt({
    secret: 'secret-key',
    algorithms: ['HS256']
});
//let id_user = 0;

const secretkey = "feurjefeurjefeur"

const router = express.Router();

const app = express();
const port = 8000;

router.use(express.json());

app.set('trust proxy',1)

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
      credentials: true,
    })
);

app.set('trust proxy', 1);
app.use(
    session({
    secret: 'macléptdrlolmdr', // set your own secret key
    name : `session`,
    resave: false,
    saveUninitialized: false,
    store : new MemoryStore({
        checkPeriod: 1000* 60 * 30
    }),
    
    
    cookie: { maxAge: 1000 * 60 * 30,
            name:'nymous',
            sameSite : false,
            resave : false,
            } // 30 minutes in milliseconds
}));

/*
const urldb = "mongodb://localhost:27017/"
const client = new MongoClient(urldb);
*/
                                                                                                                                      
const url = "mongodb+srv://iordachetiberiu19:okok@cluster0.iwpbbsp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(express.json({limit: '50mb'})); //augmenter limite pour pouvoir envoyer des images
app.use(express.urlencoded({ limit: '50mb', extended: true}));



router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.send("Serveur à l'écoute");
})
//creation user
.put('/api/users/user', async (req, res) =>{
    // Pour plus de lisibilité, on peut aussi définir const{...}=req.body
    //const {prenom, nom, mail, login, mdp, mdp_bis}=req.body;
    //console.log("bonjour")
    try {

        //console.log(req.body);

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

        let utilis = await Users.getUser(req.body.login)

        if(utilis){

            res.status(400).json({
                status: 400,
                "message": "login déjà pris"               
            });

            return;
        }
        
        Users.createUser(req.body);
        res.status(200).json({
            stauts: 200,
            "message": "utilisateur cree"
        })
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

.post('/api/users/user/login', async (req,res)=>{
    //const {login,password}=req.body;
    try{
        let user = await Users.getUser(req.body.login);
        //console.log(user);

        if(!user){
            res.status(404).json({
                status: 404,
                "message": "Requête invalide, utilisateur n'existe pas"
            });
            return;
        }
        
        let password = await user.mdp;

        if(password != req.body.mdp){
            res.status(401).json({
                status: 401,
                "message": "Mauvais mdp/login "
            })
            return;
        } 
        
        //req.session.login = user.login;
        //console.log("voici le machin",req.session.id,req.session);

        const token = jwt.sign({ login: user.login }, secretkey);
        var test = jwt.verify(token,secretkey);

        console.log("ceci est un test",test);


        res.json({
            token,
            login: user.login,
            message: "hello user: "+ user.login,
            //id: req.session.id,
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

.get('/api/users/user/login',(req, res) => {
    // Check if the session data contains user information
    try{
        console.log("voici le truc",req.headers.authorization)//.authorization.split(' ')[1])
        if(!req.headers.authorization)return;
        var authorization = req.headers.authorization.split(' ')[0];
        console.log("authorization", authorization);
        var decoded = jwt.verify(authorization, secretkey)
        console.log("voici le machin",decoded);
        if (req.headers.authorization) {
        res.json({logged : true,
                    login :  decoded.login
                    });
        } else {
        res.send({logged : false});
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

//logout
.delete('/api/users/user/logout',(req,res)=>{
    try{
        if (req.session) {
            req.session.destroy(err => {
              if (err) {
                res.status(401).json({message:"Unable to logout: utilisateur n'existe pas",
                                    status: 401,
                                    })
              } else {
                res.status(200).json({message:'Session fermee',
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
// User
.get('/api/users/exists/:user', async (req,res)=>{

    try{
        let test = await Users.getUser(req.params.user);
        console.log(req.params.user, test )
        let tres = !(test == null);

        res.json({
            message: tres,
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

//deleteuser
.delete('/api/users/user', async (req,res)=>{
    //a ajouter bouton react qui permet de delete le compte
    try{
        console.log("on rentre directement dans le delete")
        let login = await Users.getUser(req.body.login)
        if (login){
            //supprimer les messages
            //supprimer les amis
            //deleteUser fait ca
            Users.deleteUser(req.body.login);
            res.status(200).json({
                status:200,
                message: "user enleve"
            })
        }
        else{
            res.status(400).json({
                message : "user does not exist"
            })
            //res.end();
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
.post('/api/messages/users/user', async (req,res)=>{
    //const {message,login,date} = req.body;
    try{

        if(req.body.message === ""){
            res.status(400).json({
                status : 400,
                "message" : "requete invalide, message vide"
            });
            return;
        }

        /*vérifier que l'utilisateur existe */
        else{
            let user = await Users.getUser(req.body.login)
            //console.log(user);
                if(!user){
                    res.status(400).json({
                        status: 400,
                        "message": "user inexistant"               
                    });
                    return;
                }
                Messages.createMessage(req.body);
                    res.status(200).json({
                    stauts: 200,
                    "message": "message poste",
                    text: req.body.message,
                    author: req.body.login,
                    date: new Date(Date.now())
                })
                //res.end();
        }
    }
    
    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
    }
})

//SearchMessages
.get('/api/messages/search/:msg', async (req,res)=>{
    //const {message} = req.body;
    try{

        if(req.body.message === ""){
            res.status(400).json({
                status : 400,
                "message" : "requete invalide, message vide"
            });
            return;
        }

        /*vérifier que le texte existe dans la bdd*/

        let test = await Messages.SearchMessages(req.params.msg);
        //console.log("dans api ",test)
        //console.log(res.message)
        //console.log("dans api ",test)
        if(!test){console.log("mille milliards de mille sabords !");return;}
        if(!test[0]){
            res.status(404).json({
                status: 404,
                message: "le message recherche n'existe pas"
            })  
            return;
        }

        res.status(200).json({
            message: test,
            status:200
        })

        res.end();
        
    }
    
    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
    }
})

//update message
.put('/api/messages/users/user', async (req,res)=>{
    //const {message,login,id} = req.body;
    try{
        
        let id_msg = await Messages.getMessageID(req.body._id.$oid)
        //console.log(id_msg);

        if(!id_msg){
            res.status(404).json({
                status : 404,
                "message" : "requete invalide, message inexistant"
            });
            return;
        }
        
        else{
            if(req.body.message === ""){
                res.status(400).json({
                    status : 400,
                    "message" : "requete invalide, message vide"
                });
                return;
            }
            else{
                let user = await Users.getUser(req.body.login)
                if(!user){
                    res.status(401).json({
                        "message " : "Unauthorized vous n'êtes pas l'auteur de ce message"
                })
            }
    
                else{
                    await Messages.updateMessage(req.body._id.$oid,req.body.message)
                    res.json({login: user.login,
                        message: "message updaté",
                        status: 201});
                    
                    res.end();
                }
            }
        }
    }
    
    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//getMessage
.get('/api/messages/users/user', async (req,res)=>{

    try{
        let test = await Messages.getMessageID(req.body._id.$oid);
        if (!test){
            res.status(404).json({
                status: 404,
                messagem: "message inexistant"
            })  
            return;
        }
        res.status(200).json({
            status: 200,
            message_id: test
        })
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

//getMessagesFromUser
.get('/api/messages/users/:login', async (req,res)=>{

    try{

        //console.log(req.params.login);

        let user = await Users.getUser(req.params.login)
        console.log("il existe ?", user)
        if(!user){//si null
            if(typeof user==='undefined'){console.log("je l'ai eu!");return;}
            res.status(404).json({
                status: 404,
                message: "l'utilisateur n'existe pas"
            })  
            return;
        }

        let test = await Messages.getMessagesFromUser(req.params.login);
        if(typeof test==='undefined'){console.log("je l'ai eu!");return;}
        if (test.length == 0){
            console.log("____________________________________________________________________________________________")
            res.status(200).json({
                status: 200,
                message: []
            })  
            return;
        }
        res.status(200).json({
            status: 200,
            message_id: test
        })
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

//getMessageContactOnly
.get('/api/messages/users/:login/contacts', async (req,res)=>{

    try{
        let user = await Users.getUser(req.params.login);
        //console.log(user)
        if(!user){
            if(typeof user ==='undefined'){console.log("bravo, capitaine !");return;}
            res.status(404).json({
                status: 404,
                messages: "utilisateur inexistant"
            })  
            return;
        }
        let amis = await Friends.getUsersFriends(req.params.login);
        //console.log(amis)
        if (!amis){
            res.status(404).json({
                status: 404,
                messages: "l'utilisateur n'a pas d'ami"
            })  
            return;
        }
        //faut recuperer le message pour chaque user
        let msgs = []
        let i =0 
        while(i<amis.length){
            msgs = msgs.concat(await Messages.getMessagesFromUser(amis[i]));
            i++;
        } 
        //console.log(msgs, i);
        //let msg = await Messages.getMessagesFromUser(amis[1])
        //console.log(msg);
        
        res.status(200).json({
            status: 200,
            messages: msgs
        })
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

//getAllmessage
.get('/api/messages', async (req,res)=>{

    try{
        let test = await Messages.getAllMessage();
        if (!test){
            res.status(404).json({
                status: 404,
                messages: "aucun message disponible"
            })  
            return;
        }
        res.status(200).json({
            status: 200,
            messages: test
        })
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

//delete message
.delete('/api/messages/users/user', async (req,res)=>{
    //const {_id,login} = req.body;
    //console.log("_id body ",req.body._id)
    //console.log(req.body)
    try{
        let user = await Users.getUser(req.body.login)
        //console.log("user ",user)
        if(user){ //si user existe, alors on va tester si le message lui appartient
            let msg_id = await Messages.getMessageID(req.body._id.$oid);
            //console.log("msg_id ", msg_id)
            //console.log("user ",user)
            if(!msg_id){
                res.status(404).json({
                    status : 404,
                    "message" : "requete invalide, message inexistant"
                });
                return;
            }
            else{//message existant
                await Messages.deleteMessage(req.body._id.$oid)
                res.status(200).json({
                    status : 200,
                    "message" : "message supprime"
                });
            }
        }
        else{
            res.status(404).json({id: id_user,
                message: "utilisateur inexistant",
                status: 404});
        }
    }

    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})


//put FriendRequest
.put('/api/friends/users/request/:login', async (req,res)=>{
    try{
        const reciever = req.params.login;
        const sender = req.body.login;

        const exist = await Users.getUser(reciever);

        if(!exist){
            res.status(404).json({
                status:404,
                message:"utilisateur inexistant" 
            })
            return;
        }

        let isnotfriend = []
        isnotfriend = await Friends.friendExist(sender,reciever);

        if(await isnotfriend.length > 0){
            res.status(200).json(
                {
                    status:200,
                    message:"déjà amis !"
                }
            )
            return;
        }

        await Friends.addfriendrequest(sender,reciever)
        res.status(200).json({
            status: 200,
            message: "requête envoyée"})
    }
    catch(e){
        //console.log(e);
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})


//get friendsrequest
.get('/api/friends/users/request/:login',async(req,res)=>{

    try{
        const requests = await Friends.getrequestsforuser(req.params.login);
        console.log(requests)
        res.status(200).json({
            status:200,
            message: requests
        })
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
.post('/api/friends/users/:login', async (req,res)=>{
    //const {login} = req.body
    /* tester si user qu'on veut ajouter existe bdd */
    const user = req.params.login; //c'est nous
    let user_n = await Users.getUser(user); //requete pour tester si nous existons dans la bdd

    let user_a = await Users.getUser(req.body.login) //c'est celui qu'on veut etre ami avec, requete bdd

    //console.log(user_ami)
    //console.log(user)

    try{
        if(!user_a){
            res.status(400).json({
                status: 400,
                "message": "Requête invalide, utilisateur pour lequel on envoie la relation d'amitie inexistant"
            });
            return;
        }

        if(!user_n){
            res.status(400).json({
                status: 400,
                "message": "Requête invalide, utilisateur qui envoie la relation d'amitie inexistant"
            });
            return;
        }

        if(user_n.login==user_a.login){
            res.status(401).json({
                status: 401,
                "message": "meme utilisateur: on ne peut pas se suivre nous memes"
            })
            return;
        }

        const get = await Friends.friendExist(req.params.login,user_a.login)

        //console.log()
        //console.log(get)

        if(get.length >= 1){
            console.log(get[0])
            console.log(get[1])
            res.status(400).json({
                status: 400,
                "message": "Requête invalide , friendship existe deja"
            });
            return;
        }

        Friends.createFriend(req.params.login,user_a.login);
        res.json({
            message: "je suis ami avec: "+req.body.login,
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

//getFriendshipID
.get('/api/friends/users/user', async (req,res)=>{
    const {login1,login2} = req.body;
    try{
        //console.log(req.body.login1);
        //console.log(req.body.login2);
        let user1 = await Users.getUser(req.body.login1);
        let user2 = await Users.getUser(req.body.login2);

        if (!user1 || !user2){//si les utilisateurs n'existent pas
            res.status(404).json({
                status: 404,
                message: "utilisateur ou utilisateurs inexistant/s"
            })  
            return;
        }

        if(user1.login == user2.login){
            res.status(404).json({
                status: 404,
                message: "pas de friendship entre le meme utilisateur"
            })  
            return;
        }
        
        let friendship = await Friends.getFriendshipID(req.body.login1, req.body.login2);
        if(!friendship){
            res.status(404).json({
                status: 404,
                message: "friendship inexistant"
            })  
            return;
        }
    
        res.status(200).json({
            status: 200,
            _id: friendship._id
        })
    }

    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//deleteFriend
.delete('/api/friends/users/user', async (req,res)=>{
    const {login1,login2} = req.body;
    //console.log(req.body.login1);
    //console.log(req.body.login2);
    try{
        let friendship = await Friends.getFriendshipID(req.body.login1, req.body.login2);
        if(!friendship){
            console.log("===>",req.body.login1, req.body.login2)
            res.status(404).json({
                status: 404,
                message: "friendship inexistant"
            })  
            return;
        }
        else{
            //console.log(friendship)
            await Friends.deleteFriend(friendship._id)
            res.status(200).json({
                status : 200,
                "message" : "friendship supprime"
            });
        }
    }

    catch(e){
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
    }
})

//getAllFriends
.get('/api/friends/users/:login', async (req,res)=>{
    //on passe rien dans le JSON
    const user = req.params.login; //c'est nous
     //requete pour tester si nous existons dans la bdd
    let user_n = true
    console.log("voici user", user_n)
    try{
        //user_n = await Users.getUser(user);
        if(!await user_n){
            res.status(400).json({
                status: 400,
                "message": "Requête invalide, utilisateur qui envoie la requete inexistant"
            });
            return;
        }

        const get = await Friends.getUsersFriends(req.params.login)

        res.status(200).json({
            amis: get,  
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

//getStats
.get('/api/stats', async (req,res)=>{
    //on passe rien dans le JSON
    
    try{
        
        let test = await Statistiques.Stats();

        if (!test){
            res.status(404).json({
                status: 404,
                messages: "erreur statistiques"
            })  
            return;
        }

        //console.log(test[1]);

        let nuse = (test[2] ? test[2].login : "feur");
        let ouse = (test[3] ? test[3].login : "quoi");
        if(!test[2]){return;}
        
        res.status(200).json({
            nb_users: test[0],
            nb_msg: test[1],
            new: nuse,
            old: ouse,
            status: 200});
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

//Mettre des images sur cloudinary
.post('/api/upload', async (req,res) => {
    try {
        const fileStr = req.body.data; //dans Upload UploadImage
        //console.log(req.body);
        /*upload_preset: 'dev_setups',*/
        const uploadedResponse = cloudinary.uploader.upload(fileStr, {public_id: req.body.public_id, folder: req.body.type});
        uploadedResponse.then(async (data) => {
            await client
                .db('nymous')
                .collection("User")
                .findOneAndUpdate(
                    {id: req.body.public_id},
                    { $set: {[req.body.type]: data.secure_url } },
                    { useFindAndModify: false }
                ).then(res.status(201).json({message: "Image uploaded"}));
            //console.log(data);
            //console.log(data.secure_url);
          }).catch((err) => {
            console.log(err);
        });
        //res.json({msg:"yaaaaaay"});
    } catch (error) {
        console.log(error);
        res.status(500).json({err: "Something went wrong, Failed to upload image"});
    }
})

.get('/api/images/:login', async (req,res) => {
    try {
        //console.log(req.params.login)
        await cloudinary.search.expression(`${req.params.login}`)
        .sort_by('public_id','desc')
        .max_results(1)
        .execute()
        .then(result=>{
            //console.log(result);
            if(!result.resources[0]){
                res.status(200).json({url : {url : "http://res.cloudinary.com/dkpciptvh/image/upload/v1682785185/user_pictures/Xha98kaldu_.jpg"}})
                return;
            }
            res.status(200).json({url: result.resources[0]});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({err: "Something went wrong, Failed to get image"});
    }
})

.use(function (req, res, next) {
    //console.log("feur")
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.status(404).send("Cette page n'existe pas.");
});

app.use('/', router);

    app.listen(port, function() {
        console.log('Le serveur écoute le port '+port);
});



