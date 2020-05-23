// const multer = require("multer");
const Photo = require("../Model/photos-model");

exports.findAll = (req, res) => {
  Photo.getAll((err, data) => {
  if (err)
    res.status(500).send({
      message:
      err.message || "Quelques erreurs sont parvenus dans le controller Photo"
    });
  else res.send(data);
  });
};



//findOne
exports.findOne = (req, res) => {
    Photo.getId(req.params.id, (err, data) => {
      if (err){
        if (err.kind === "Pas trouvé") {
          res.status(404).send({
            message: `Cet Photo n'exite pas ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Retrouve pas cet Photo " + req.params.id
          });
        }
      } else res.send(data)
    });
  }
  
  
  //deleteOne
exports.delete = (req, res) => {
    Photo.deleteId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "Pas trouvé") {
          res.status(404).send({
            message: `Erreur id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Impossible de supprimé id " + req.params.id
          });
        }
      } else res.send({ message: `Photo supprimé =!` });
    });
};
  

// exports.create = (req, res) => {
//     if (!req.body) {
//       res.status(400).send({
//         message: "Veuillez remplir les champs"
//       });
//     }
  
//     const photo = new Photo({
//       name: req.file.location
      
//     });
  
//     // Save Gite in the database
//     Photo.create(photo, (err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Quelques erreurs sont parvenus dans le controller Gite."
//         });
//       else res.jsong({'imageUrl':  req.file.location});
//     });
  
  
//   };
  