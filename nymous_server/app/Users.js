const {MongoClient} = require('mongodb');
/*
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
*/


// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://iordachetiberiu19:okok@cluster0.iwpbbsp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
/*
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log("users",err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
*/
      
async function createUser(body){
    try {
        await client.connect();
        const resultat = await client.db('nymous').collection('users').insertOne(body);
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close();
    }
}


async function getUser(login_param){
    let resultat;
    try{
        await client.connect();
        //query = {login:{$eq: login_param}}
        resultat = await client.db('nymous').collection('users').findOne({login:login_param});
    }
    catch(e){                        
        console.error(e)
    }
    finally{
        await client.close();
        return resultat;
    }
}

    async function deleteUser(login){
        try{
            await client.connect();
            query = {login:{$eq: login}}
            await client.db('nymous').collection('messages').deleteMany(query);
            await client.db('nymous').collection('friends').deleteMany({
                $or: [
                  { login1: login},
                  { login2: login}
                ]
              });
            await client.db('nymous').collection('users').deleteOne(query);
            //res = await resultat.toArray();
        }
        catch(e){
            console.error(e)
        }
        finally{
            await client.close()
            //return res;
        }
        
    }

exports.createUser = createUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;