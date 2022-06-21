// Dependencies
const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: 'remotemysql.com',
  user: 'owlR9qNmhw',
  password: 'Giy7LuE5Ys',
  database: 'owlR9qNmhw'
})
app.use(cors());

app.get("/api/get", (req, res) => {
  const sqlRequest = "SELECT * FROM Watches;"
  // const sqlRequest = "INSERT INTO Logement (adresse, nomProprio,type,nbPieces,superficie,etat,prix, dateDispo, ville, nbGarages) VALUES ('25 rue de chaipakoa', 'jessy', 'maison',3, 123, 'neuf', 1000000, '2022-05-12', 'chelles', 2);";
  db.query(sqlRequest, (err, result) =>{
      if(err) {
          console.log(err);
          res.send(err.toString()); 
       }
       else{
       res.json(result);
       console.log(result[0].price);}
      
  });
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});