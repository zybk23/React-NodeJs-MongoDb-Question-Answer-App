const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const bodyParser=require("body-parser");
const routers=require("./routers/index");
const connectDatabase=require("./helpers/database/connectDatabase");
const customErrorHandler=require("./middleWare/errors/customErrorHandles");
const path=require("path");



const app=express();


dotenv.config({
    path:"./config/env/config.env"
});

connectDatabase();

const PORT=process.env.PORT;


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use("/api",routers);

app.use(customErrorHandler);

app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT,()=>{
    console.log(`App started on ${PORT}:${process.env.NODE_ENV}`);
});
