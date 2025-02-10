import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port= 3000;

app.use(express.static("public"));

app.get('/', async (req, res)=>{
    try {
        //get from api
       const response= await axios.get("https://api.nasa.gov/planetary/apod?api_key=kIfyb2bfg5CFASJQV8SCvr3JmVRL6wSRL2bVzhoF");
       const results= response.data;
       console.log(results)
       res.render("home.ejs",{data: results});

        
    } catch (error) {
        
    }

})

//we want the image and description

app.listen(port, ()=>{
    console.log("Listening on port 3000")
})