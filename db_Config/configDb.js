import { MongoClient } from "mongodb";

let client;
const url = 'mongodb://localhost:27017/tracker';
const connectionUsingMongoose=async()=>{
    MongoClient.connect(url).then((clientInstance)=>{
        client=clientInstance;
        console.log("connected to mongodb successfully");
    }).catch((error)=>{
        console.log("error while connecting to mongodb");
    })
    
}
export default connectionUsingMongoose;
export const getDb=()=>{
    if(!client){
        console.log("client is null");
    }
    return client.db();
}

