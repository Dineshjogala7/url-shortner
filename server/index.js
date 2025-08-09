const express = require("express");

const app = express();

const router = require("./routes/url");
const handleMongo = require("./connect");
const cors = require('cors');
app.use(cors())
app.use(express.json());

handleMongo("mongodb://localhost:27017/short-url").then(()=>console.log('mongo is connected')).catch(()=>console.log("error occured"));
app.use("/url",router);
const port = process.env.PORT||3000;


app.listen(port,()=>{
    console.log("server listening at port 3000");
})
