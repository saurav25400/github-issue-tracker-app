import { ObjectId } from "mongodb";
import { getDb } from "../../db_Config/configDb.js"

export class TrackerRepository{
    constructor(){
        this.collectionName="projectInfo"
    }
    async addProject(names,desc,author){
        try{
           const db=getDb();
           const result=await db.collection(this.collectionName).insertOne(
            {projectName:names,description:desc,author:author}
           );
           if(result.insertedId){
            return {success:true}
           }
           else{
            return {success:false}
           }
        }
        catch(error){
            console.log(error);
           
        }
    }
    async gatAllProjectInfo(){
        try{
            const db=getDb();
            const projectInfo=await db.collection(this.collectionName).find({}).toArray();
            return projectInfo;



        }
        catch(error){
            console.log(error);
        }
    }
    // get by id
    async getById(id){
        try{

            const db=getDb();
            const data=await db.collection(this.collectionName).findOne({_id:new ObjectId(id)});
            return data;
        }
        catch(error){

        }
    }
    // posting created issue to databse
    async postIssueToDb(title,description,issueCreator,labels){
        try{
            const db=getDb();
            const result=await db.collection('issueInfo').insertOne({
                title:title,
                description:description,
                issueCreator:issueCreator,
                labels:labels
            });
            if(result.insertedId){
                return {success:true};
            }
            else{
                return {success:false};
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async getAllIssueFromDb(){
        try{
            const db=getDb();
            const data=await db.collection('issueInfo').find({}).toArray();
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    // get searched data from database
    async searchResult(query){
        try{
            const db=getDb();
            console.log('query', query);
            const authorArr=await db.collection('issueInfo').find({title:query}).toArray();
            if(authorArr){
                return authorArr;
            }
        }
        catch(error){
            console.log(error);
        }
    }


}