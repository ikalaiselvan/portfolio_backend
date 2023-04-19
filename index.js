import express from "express";
import cors from 'cors';
import { MongoClient } from "mongodb";
import newDateTime from "./date.js";

import sendEmail from "./utils/sendEmail.js";

// import .env file
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongodb is connected ...");

app.use(express.json());
app.use(
  cors()
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );


app.get("/",(req, res)=>{
    res.send("This is my portfolio");
})



app.post("/portfolio", async function (request, response) {
  const data = request.body;
  const dataWithDate = {...data, ...newDateTime}

  const result = await client
    .db("portfolio")
    .collection("html")
    .insertOne(dataWithDate);

  response.send(result);
  if(result.acknowledged){
    
    // const link = `http://localhost:3000/passwordReset?name=${dataWithDate.name}&email=${dataWithDate.email}&message=${dataWithDate.message}`;
    console.log("Email : ",dataWithDate.email)
    await sendEmail(
      dataWithDate.email,
      "Recruiter from my portfolio ",
      `name: ${dataWithDate.name},     email: ${dataWithDate.email},      message: ${dataWithDate.message}`
    );
    
  }
});

app.listen(PORT, ()=>{
    console.log("app is running on port :", PORT)
})


