const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:<password>@cluster0.z0vtj.mongodb.net/test";

const client = new MongoClient(uri);

try {
    client.connect();
 
} catch (e) {
    console.error(e);
}