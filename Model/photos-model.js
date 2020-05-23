const pool = require("../middleware/dbConnect");


// constructor
const Photo = function(pho) {
  this.name = pho.name;
  this.location = pho.name
};
  
Photo.create = (newPhoto, result) => {
  pool.query("INSERT INTO photos SET ?", newPhoto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created gite: ", { id: res.insertId, ...newPhoto });
    result(null, { id: res.insertId, ...newPhoto });
  });
};

Photo.getAll = result => {
  pool.query("SELECT * FROM photos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Liste de photos: ", res);
    result(null, res);
  });
};

Photo.getId = (id, result) => {
  pool.query(`SELECT * FROM photos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("photo: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Customer with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Photo.deleteId = (id, result) => {
  sql.query(`DELETE FROM photos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("photo supprimé", id);
    result(null, res);
  });
};



// app.post('/upload', function (req, res) {
//   upload(req, res, function (err) {
//       console.log("Request ---", req.body);
//       console.log("Request file ---", req.file);//Here you get file.
//       /*Now do where ever you want to do*/
//       if(!err) {
//           return res.send(200).end();
//       }
//   })
// })

module.exports = Photo;
