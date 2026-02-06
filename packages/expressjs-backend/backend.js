// backend.js
import express from "express";
import cors from "cors";
import userService from "./service/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World This is David! JESUS LOVES YOU");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };
// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = userService.findUserById(id);
    if (id != undefined) {
      const promise = userService.findUserById(id);
      promise.then(result => { 
        if (result != null){
        res.send({users_list: result});
        } else {
          res.status(404).send()
        }
      });
  }
});

  
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    const promise = userService.findUserByName(name);
    promise.then(result => { 
      if (result != null){
      res.send({users_list: result});
      } else {
        res.status(404).send()
      }
    })
  }
  else if (job != undefined){
    const promise = userService.findUserByJob(job);
    promise.then(result => { 
      if (result != null){
      res.send({users_list: result});
      } else {
        res.status(404).send()
      }
    })
  } else {
    const promise = userService.getUsers()
    promise.then(result => { 
      if (result != null){
      res.send({users_list: result});
      } else {
        res.status(404).send()
      }
    })
  }
 
});
// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };
app.delete("/users/:id", (req, res) => {
  const { id }  = req.params; //or req.params.id
  let promise = userService.deleteUserById (id);
   promise.then(result => { 
    if ( result != null){
    res.status(204).send();
    } else {
      res.status(404).send()
    }
  });
});
app.post("/users", (req, res) => {
  const promise = userService.addUser(req.body);
  promise.then(result => { 
    if ( result != null){
    res.status(201).send(result);
    } else {
      res.status(500).send()
    }
  });
});

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));
// //const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };