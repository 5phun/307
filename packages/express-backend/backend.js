// backend.js
import express from "express";
import cors from "cors";

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

  //step 4 and 7, get users by name and job
  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const findUserByNameAndJob = (name,job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  };

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
      if(job != undefined) {
        let result = findUserByNameAndJob(name,job);
        result = { users_list: result };
        res.send(result);
      }
      else{
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
      }
    } else {
      res.send(users);
    }
  });
//step 5 get users by id
const findUserById = (id) =>
users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
// Implement an ID generator function to generate a random ID 
const rand_id = () =>
{
  return String(Math.floor(Math.random() * 1000000));
};
//step 6 using post
const addUser = (user) => {
    user.id = rand_id();
    users["users_list"].push(user);
    return user;
  };
  //implement the 201 HTTP code in response to a successful user insertion in the list.
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newuser = addUser(userToAdd);
    //Return newly created object from POST
    console.log(newuser);
    res.status(201).json(newuser);
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


 