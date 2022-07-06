import React, { useState, useEffect } from "react";
import authenticationService from "../services/authentication";
import '../styles/ModifyUser.css';

const ModifyUser = () => {
  const [prenom, setprenom] = useState("");
  const [nom, setnom] = useState("");
  const [mail, setmail] = useState("");
  const [id, setid] = useState("");

  // display the current User info :
  const currentUser = () => {
    authenticationService.verifyUser()
        .then((response) => {
            if (response) {
                const first_name = response.element1;
                const last_name = response.element2;
                const email = response.element3;
                const id = response.id;

                setprenom(first_name);
                setnom(last_name);
                setmail(email);
                setid(id);
            } else {
                alert("Something went wrong... Please try later.");
            }
        });
  };

  // JSON.stringify permet de convertir un objet en string
  // {} : représente un objet
  // Si on met axios.get(la méthode à exécuter, les paramètres).then(renvoie le return de la méthode exécutée)
  const deleteUser = () => {
    authenticationService.deleteUser(id)
        .then((response) => {
        if (response) {
            alert(response);
        } else {
            alert("Something went wrong... Please try later.");
        }
        });
  };

  // FONCTION UPDATE PROBLEMATIQUE :
  const updateUser = () => {
    authenticationService.updateUser(id, {
        mail: mail,
        prenom: prenom,
        nom: nom,
    })
      .then((response) => {
        if (response) {
          alert(response);
        } else {
          alert("Something went wrong... Please try later.");
        }
      });
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <div className="Content">
      <div className="col-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name="prenom"
            className="form-control"
            id="floatingInput"
            placeholder="First Name"
            value={prenom}
            style={{color: "#000"}}
            onChange={(e) => {
              setprenom(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="col-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name="nom"
            className="form-control"
            id="floatingInput"
            placeholder="Last Name"
            value={nom}
            style={{color: "#000"}}
            onChange={(e) => {
              setnom(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="col-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name="mail"
            className="form-control"
            id="floatingInput"
            placeholder="email"
            value={mail}
            style={{color: "#000"}}
            onChange={(e) => {
              setmail(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="col-6 d-grid">
        <button onClick={deleteUser} className="btn btn-primary" type="submit">
          Delete
        </button>
      </div>
      <div className="col-6 d-grid">
        <button onClick={updateUser} className="btn btn-primary" type="submit">
          Update
        </button>
      </div>
    </div>
  );
};

export default ModifyUser;
