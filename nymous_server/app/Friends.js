const {MongoClient} = require('mongodb');
/*
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
*/

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://iordachetiberiu19:okok@cluster0.iwpbbsp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);


const ObjectId = require('mongodb').ObjectId
      
async function createFriend(body1,body2){
    try {
        await client.connect();
        //console.log("Bonjour createFriend")
        const resultat = await client.db('nymous').collection('friends').insertOne({login1:body1,login2:body2});
        await client.close()
        await client.connect()
        //resultat = await resultat
        if(await resultat){
            const res2 = await client.db('nymous').collection('users').updateMany(
                {$or : [
                    {login : body1},
                    {login : body2}
                    ]
                },
                {$pull : {request : {$in : [body1,body2]}}}

            )
        }
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
    }
}
async function friendExist(body1,body2){
    let resultat 
    try {
        await client.connect();
        //console.log("Bonjour friendExist");

        resultat = await client.db('nymous').collection('friends').
        find( {
            $or: [
              { login1: body1, login2: body2 },
              { login1: body2, login2: body1 }
            ]
          }).toArray();

    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
        return resultat;
    }
}

async function deleteFriend(id){
    let resultat
    try{
        console.log("bonjour deleteFriend");
        //console.log(id)
        await client.connect();
        let oid = new ObjectId(id);
        //console.log(oid);
        resultat = await client.db('nymous').collection('friends').deleteOne({_id:id})
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
    }
}

async function getFriendshipID(body1, body2){
    let resultat
    try{
        await client.connect();
        //console.log(body1);
        //console.log(body2);
        console.log("bonjour getFriendshipID")
        resultat = await client.db('nymous').collection('friends').
            findOne( { $or: [
                { login1: body1, login2: body2 },
                { login1: body2, login2: body1 }
              ]});
        //console.log(resultat)
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
        return resultat;
    }
}

async function getUsersFriends(body){
    let resultat1
    let resultat2
    let res1
    let res2
    let res
    try{
        await client.connect();
        //console.log("bonjour getAllFriends")
        resultat1 = await client.db('nymous').collection('friends').
            find({login1:body});
        resultat2 = await client.db('nymous').collection('friends').
            find({login2:body});
        
        res1 = await resultat1.toArray();
        res1 = res1.map(dict=>dict.login2);
        res2 = await resultat2.toArray();
        res2 = res2.map(dict=>dict.login1);
        res = res1.concat(res2);
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
        return res;
    }
}

async function addfriendrequest(sender,reciever){
    try{
    await client.connect();
    resultat = await client.db("nymous").collection('users').updateOne(
        {login : reciever},
        {$addToSet : {"request":sender}}
    )
    }
    catch(e){
        console.error(e)
    }
    finally{
        client.close()
    }
}

async function getrequestsforuser(login){
    let resultat = [];
    try{
        await client.connect();
        let rest = await client.db("nymous").collection("users").findOne(
            {login : login},
            {request : true})
        resultat = rest.request
    }
    catch(e){
        console.error(e)
    }
    finally{
        return resultat;
    }
}

exports.getrequestsforuser = getrequestsforuser;
exports.createFriend = createFriend;
exports.friendExist = friendExist;
exports.deleteFriend = deleteFriend;
exports.getFriendshipID = getFriendshipID;
exports.getUsersFriends = getUsersFriends;
exports.addfriendrequest = addfriendrequest;