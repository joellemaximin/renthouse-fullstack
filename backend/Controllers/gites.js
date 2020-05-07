const Gite = require("../Models/gite-model");
// const uploadToS3 = require('../services/file-upload')


exports.findAll = (req, res) => {
    Gite.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Quelques erreurs sont parvenus dans le controller Gite"
        });
      else res.send(data);
    });
};

//if user connect create a gite
exports.create = (req, res) => {
  const gite = req.body;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs"
    });
  }

  // if(req.files) {
  //   if('photo' in req.files ) {
  //     uploadToS3({
  //       file: req.files.photo,
  //       folerName: 'photos'
  //     })
  //     .then(response => {
  //       gite.photo = response[0][0];
  //       createUser();
  //     });
  //   }
  // }

  // Save Gite in the database
  Gite.create(gite, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller Gite."
      });
    else res.send(data);
  });


};

//findOne
exports.findOne = (req, res) => {
  Gite.getId(req.params.id, (err, resultat) => {
    if (err){
      if (err.kind === "Pas trouvé") {
        res.status(404).send({
          message: `Ce gite n'exite pas ${req.params.id} .`
        });
      } else {
        res.status(500).send({
          message: "Retrouve pas ce gite " + req.params.id
        });
      }
    } else
    res.send(resultat)
  });
}

//update one
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs!"
    });
  }

  Gite.updateId(
    req.params.id,
    new Gite(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "Pas trouvé") {
          res.status(404).send({
            message: `Erreur id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur pour cet update id" + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//deleteOne
exports.delete = (req, res) => {
  Gite.remove(req.params.id, (err, data) => {
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
    } else res.send({ message: `Gite supprimé =!` });
  });
};
