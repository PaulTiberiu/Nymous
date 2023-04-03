const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
	 
    class Users{

        createUser(body){
            return new Promise((resolve,reject)=>{
                try {
                    console.log("bonjour create user")
                    client.connect();
                    const resultat = client.db('nymous').collection('users').insertOne(body);
                    console.log(resultat); 
                }
                catch(e){
                    console.error(e)
                }
            })
        };

        deleteUser(user_id){
            return new Promise((resolve, reject)=>{
                try{
                    console.log("bonjour delete user")
                    client.connect();
                    query = {user_id:user_id}
                    const resultat = client.db('nymous').collection('users').deleteOne(query)
                    //console.log(resultat);
                }
                catch(e){
                    console.error(e)
                }
                finally{
                    client.close()
                }
            })
            
    }  
    
    }
exports.default = Users;