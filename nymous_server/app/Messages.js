const {MongoClient} = require('mongodb');
/*
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
*/
const ObjectId = require('mongodb').ObjectId


// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://iordachetiberiu19:okok@cluster0.iwpbbsp.mongodb.net/?retryWrites=true&w=majority";const client = new MongoClient(url);

      
async function createMessage(body){
    try {
        await client.connect();
        const resultat = await client.db('nymous').collection('messages').insertOne(body);
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
    }
}

async function getAllMessage(){
    let resultat
    try{
        await client.connect();
        //console.log("bonjour getAllMessage")
        resultat = await client.db('nymous').collection('messages').find();
        res = await resultat.toArray();
        //console.log(res)
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
        return res;
    }
}

async function getMessageID(id_msg){
    let resultat
    try{
        await client.connect();
        //console.log("bonjour getMessageID")
        oid = new ObjectId(id_msg)
        console.log(id_msg)
        resultat = await client.db('nymous').collection('messages').findOne({_id : oid });
        //console.log(resultat)//
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
        return resultat;
    }
}

async function updateMessage(id, message){
    try{
        await client.connect();
        oid = new ObjectId(id)
        resultat = await client.db('nymous').collection('messages').updateOne({_id:oid},{$set:{message:message}});
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
    }
}

async function deleteMessage(id){
    try{
        //console.log("bonjour delete message");
        await client.connect();
        let oid = new ObjectId(id);
        const resultat = await client.db('nymous').collection('messages').deleteOne({_id:oid})
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
    }
}

//Permet d'afficher les messages propres sur la page de profil
async function getMessagesFromUser(body){
    let resultat
    let res
    try{
        //console.log("bonjour getmessagefromuser");
        await client.connect();
        resultat = await client.db('nymous').collection('messages').find({login:body})
        res = await resultat.toArray();
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
        return res;
    }
}

async function getMessageContactOnly(body){
    let resultat
    let res
    try{
        //console.log("bonjour getmessagecontactonly");
        await client.connect();
        resultat = await client.db('nymous').collection('messages').find({login:body})
        res = await resultat.toArray();
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
        return res;
    }
}

async function SearchMessages(body){
    let resultat
    let res
    try{
        //console.log("bonjour SearchMessages");
        await client.connect();
        query = `\"${body}\"`
        console.log(query)
        await client.db('nymous').collection('messages').createIndex({ message: "text"});
        resultat = await client.db('nymous').collection('messages').find({$text: {$search: query}});
        res = await resultat.toArray();
        //console.log("res",res);
    }   
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
        return res;
    }
}


exports.SearchMessages = SearchMessages;
exports.getMessageContactOnly = getMessageContactOnly;
exports.createMessage = createMessage;
exports.getAllMessage = getAllMessage;
exports.getMessageID = getMessageID;
exports.updateMessage = updateMessage;
exports.deleteMessage = deleteMessage;
exports.getMessagesFromUser = getMessagesFromUser;