const Role = require("../Models/role-model");
// const uploadToS3 = require('../services/file-upload')


exports.findAll = (req, res) => {
    Role.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Quelques erreurs sont parvenus dans le controller role"
        });
      else res.send(data);
    });
};

//if user connect create a role
exports.create = (req, res) => {
  const role = req.body;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs"
    });
  }

  // Save role in the database
  Role.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller role."
      });
    else res.send(data);
  });


};

//findOne
exports.findOne = (req, res) => {
  Role.getId(req.params.id, (err, resultat) => {
    if (err){
      if (err.kind === "Pas trouvé") {
        res.status(404).send({
          message: `Ce Role n'exite pas ${req.params.id} .`
        });
      } else {
        res.status(500).send({
          message: "Retrouve pas ce Role " + req.params.id
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

  Role.updateId(
    req.params.id,
    new Role(req.body),
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
  Role.remove(req.params.id, (err, data) => {
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
    } else res.send({ message: `Role supprimé =!` });
  });
};
