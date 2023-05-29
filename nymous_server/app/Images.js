const {MongoClient} = require('mongodb');
/*
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
*/

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://iordachetiberiu19:okok@cluster0.iwpbbsp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);


const ObjectId = require('mongodb').ObjectId
      
async function Image(body1,body2){
    try {
        await client.connect();
        const resultat = await client.db('nymous').collection('users').findOneAndUpdate(
            {id: body1},
        );
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
    }
}

exports.Image = Image;