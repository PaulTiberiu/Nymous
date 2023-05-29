const {MongoClient} = require('mongodb');
/*
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
*/
const ObjectId = require('mongodb').ObjectId

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://iordachetiberiu19:okok@cluster0.iwpbbsp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);


async function Stats(body){
    let resultat;
    let resultat2;
    let resultat3;
    let resultat4;
    let res;
    let res1;
    let list = [];
    try{
        //console.log("bonjour Stats");
        await client.connect();
        resultat = await client.db('nymous').collection('users').countDocuments();

        //console.log(resultat)
        resultat2 = await client.db('nymous').collection('messages').countDocuments();
        //console.log(resultat2)
        resultat3 = client.db('nymous').collection('users').find();
        res = (await resultat3.toArray()).reverse(); //new
        res1 = res[0]
        //console.log(res1)
        resultat4 = await client.db('nymous').collection('users').findOne(); //old
        //console.log(resultat4)

        list[0] = resultat;
        list[1] = resultat2;
        list[2] = res1;
        list[3] = resultat4;
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
        return list;
    }
}

exports.Stats = Stats;