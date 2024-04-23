// backend.js
import express from "express";
import cors from "cors";

import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
  });

  
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

  //implement the 201 HTTP code in response to a successful user insertion in the list.
  app.post("/users", (req, res) => {
  const user = req.body;
  userService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
  });

//step 7 delete 
  app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    if (id === undefined)
    {
      res.status(404).send("Resource not found")
    } else {
      users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
      res.status(204).send("Successful delete");
    }
  });


 