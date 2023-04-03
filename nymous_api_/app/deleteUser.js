const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
        
    async function deleteUser(user_id){

        try{
            console.log("bonjour delete user")
            await client.connect();
            query = {user_id:user_id}
            const resultat = await client.db('nymous').collection('users').deleteOne(query)
            //console.log(resultat);
        }
        catch(e){
            console.error(e)
        }
        finally{
            client.close()
        }
    }

exports.deleteUser = deleteUser;