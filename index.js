import express from "express";
import cors from 'cors';
import { MongoClient } from "mongodb";
import newDateTime from "./date.js";

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
app.use(cors());


app.get("/",(req, res)=>{
    res.send("Thank you to see my portfolio");
})



app.post("/portfolio", async function (request, response) {
  const data = request.body;
  const dataWithDate = {...data, ...newDateTime}

  const result = await client
    .db("portfolio")
    .collection("html")
    .insertOne(dataWithDate);

  response.send(result);
});

app.listen(PORT, ()=>{
    console.log("app is running on port :", PORT)
})

