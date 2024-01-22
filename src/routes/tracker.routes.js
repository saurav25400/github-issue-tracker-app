import express from 'express';
import { TrackerController } from '../controllers/tracker.controller.js';

const projectTrackerRouter=express.Router();

const trackerController=new TrackerController();
projectTrackerRouter.get("/issue-page/:_id",(req,res,next)=>{
    trackerController.getIssuePage(req,res,next);
})
projectTrackerRouter.get("/get-home",(req,res,next)=>{
    trackerController.getHomePage(req,res,next);
})
projectTrackerRouter.post("/home",(req,res,next)=>{
    trackerController.addProject(req,res,next);
})
projectTrackerRouter.get("/form",(req,res,next)=>{
    trackerController.issueForm(req,res,next);
})
//for redirection of issue page PRG techique.
projectTrackerRouter.get("/all-issue",(req,res,next)=>{
    trackerController.getAllIssues(req,res,next);
})

projectTrackerRouter.post("/post-data",(req,res,next)=>{
    trackerController.postIssueData(req,res,next);
})
projectTrackerRouter.get("/search",(req,res,next)=>{
    trackerController.searchResult(req,res,next);
})


 

export default projectTrackerRouter;