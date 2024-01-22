import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connectionUsingMongoose from './db_Config/configDb.js';
import projectTrackerRouter from './src/routes/tracker.routes.js';



const server=express();
// to tell express server to serve static files from public directory
server.use(express.static('./public'));
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

//setting up the view engine
server.set('view engine','ejs');
//telling express server the path of our template engine directory
server.set("views",path.join(path.resolve(),'src','views'));
// console.log(path.join(path.resolve(),'src','views'));
// console.log(path.resolve(),'hello');
server.get("/",(req,res,next)=>{
    res.send("welcome to express server.")
})

server.use("/issue-tracker",projectTrackerRouter);

//default error handler
server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
  })
server.listen(8000,()=>{
    connectionUsingMongoose();
    console.log("server is listening at port 8000");
})