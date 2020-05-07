const pool = require("../middleware/dbConnect");


// constructor
const Photo = function(pho) {
  this.name = pho.name;

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
