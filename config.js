//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ivandax:profiles1234@therook-feu7u.gcp.mongodb.net/test?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//mongodb+srv://ivandax:<password>@therook-feu7u.gcp.mongodb.net/test?retryWrites=true&w=majority

module.exports = {
    'secretKey':'12344321',
    //'mongoUrl':'mongodb://localhost:27017/conFusion'
    mongoUrl: uri,
}