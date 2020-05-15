const pool = require("../middleware/dbConnect");


// constructor
const Gite = function(gite) {
  this.rooms = gite.rooms;
  this.smallDescription = gite.smallDescription;
  this.surface = gite.surface;
  this.bathrooms = gite.bathrooms;
  this.address = gite.address;
  this.wifi = gite.wifi;
  this.terrasse = gite.terrasse;
  this.price = gite.price;
  this.nameLogement = gite.nameLogement;
  this.photoID = user.photoId;


  //FKMAPS

};
  
Gite.create = (newGite, result) => {
  
  pool.query("INSERT INTO gites SET ?", newGite, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created gite: ", { 
      id: res.insertId, ...newGite 
    });
    result(null, { 
      id: res.insertId, ...newGite
    });
  });
};

Gite.getAll = result => {
  pool.query("SELECT gites.*, photos.`name`, equipements.name, equipements.information from gites INNER JOIN photos ON gites.`id` = photos.`id` INNER JOIN equipements ON gites.`id` = equipements.`id`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Liste de gites: ", res);
    result(null, res);
  });

};

Gite.getId = (id, result) => {
  pool.query(`SELECT * FROM gites WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Gite: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found gite with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Gite.updateId = (id, gite, result) => {
  pool.query('UPDATE gites SET rooms = ?, surface = ?, smallDescription = ?, bathrooms = ?, address = ?, wifi = ?, terrasse = ?, price = ?, equipements = ?, photos = ? WHERE id = ?',
    [gite.rooms, gite.smallDescription, gite.surface, gite.bathrooms, gite.address, gite.wifi, gite.terrasse,gite.price, gite.equipments, gite.photos, id],
      (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found gite with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated gite: ", { id: id, ...gite });
      result(null, { id: id, ...gite });
  });
}


Gite.remove = (id, result) => {
  pool.query(`DELETE FROM gites WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Gite supprimé", id);
    result(null, res);
  });
};


module.exports = Gite;
