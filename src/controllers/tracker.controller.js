import { TrackerRepository } from "../repository/tracker.repository.js";

export class TrackerController{
    constructor(){
        this.trackerRepository=new TrackerRepository();
    }
    async getHomePage(req,res,next){
        try{
           const projects= await this.trackerRepository.gatAllProjectInfo();
            res.render('index',{projects:projects});
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
    async addProject(req,res,next){
        try{
            const {projectName,desc,author}=req.body;
            //for verifying use the express validators..
            if(projectName.trim()===''||desc.trim()===''||author.trim()===''){
                return res.redirect("/issue-tracker/get-home");
            }
            console.log(projectName,desc,author,'hello');
           const result= await this.trackerRepository.addProject(projectName,desc,author);
           const projects= await this.trackerRepository.gatAllProjectInfo();
            if(result.success){
                // return res.render('index',{projects:projects}); 
                return res.redirect("/issue-tracker/get-home");
            }
            else{
                return res.redirect("/issue-tracker/get-home");
            }
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
    async getIssuePage(req,res,next){
        try{
            const id=req.params._id;
            console.log(id);
            const projectDetails=await this.trackerRepository.getById(id);
            const issues=await this.trackerRepository.getAllIssueFromDb();

            res.render('issueInfo',{issues:issues,projectDetails:projectDetails});
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
    // for redirection PRG technique    
    async getAllIssues(req,res,next){
        try{
            const issues=await this.trackerRepository.getAllIssueFromDb();
            res.render('issueInfo',{issues:issues,projectDetails:null});
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
    async issueForm(req,res,next){
        try{
            res.render('issueForm',{});

        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

    //form data of raised issues
    async postIssueData(req,res,next){
        try{
            // use express-validator here.
            const {title,description,issueCreator,labels}=req.body;
            if(title.trim()===""||description.trim()===""||issueCreator.trim()===""||labels.trim()===""){
                return res.send("something is wrong");
            }
            
            console.log(title,description,issueCreator,labels,'hello');
            const result=await this.trackerRepository.postIssueToDb(title,description,issueCreator,labels);
            if(result.success){
                return res.redirect("/issue-tracker/all-issue");

            }
            else{
                return res.send("something is wrong");
            }

        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

    async searchResult(req,res,next){
        try{
            const searchedData=req.query.query;
            const issues=await this.trackerRepository.searchResult(searchedData);
            console.log(issues,'issues');
            return res.render('search',{issues:issues});
        }
        catch(error){
            console.log(error);
        }
    }
    




}