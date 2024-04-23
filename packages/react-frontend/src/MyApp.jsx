// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        if (i === index) {
          deleteUser(character._id).then((res) => {if (res.status === 204) 
            {
              console.log('successfully deleted, status code 204');
            }
          else{
            console.log("resource not found, status code ", res.status);
          }})
        }
        return i !== index;
      });
      setCharacters(updated);
  }
  function updateList(person) { 
    postUser(person)
      .then((res) => {if (res.status === 201) 
                      {
                        console.log('successfully created content, status code 201');
                        return res.json();
                      }
                    else{
                      console.log("did not create content, status code", res.status);
                    }})
      /*On the frontend, you should update the state with the right representation of the
       object that we requested to be inserted (now, it'll have the id field).*/
      .then((json) => {setCharacters([...characters, json]);
      console.log('successfully added user:', json);})
      .catch((error) => {
        console.log(error);
      })
}
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  function deleteUser(id) {
    const promise = fetch(`Http://localhost:8000/users/${id}`, {
      method: "DELETE"
    });

    return promise;
  }

  
    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
        
      </div>
    );
  }


export default MyApp;
