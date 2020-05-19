const Msg = require("../Model/message-model");
// const uploadToS3 = require('../services/file-upload')

//list des messages envoyés as user connected only and nonuser will only receive msg in email
exports.findAll = (req, res) => {
    Msg.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Quelques erreurs sont parvenus dans le controller Msg"
        });
      else res.send(data);
    });
};

exports.create = (req, res) => {
  const msg = req.body;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs"
    });
  }

  // Save Msg in the database
  Msg.create(msg, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller Msg."
      });
    else res.send(data);
  });


};

//findOne
exports.findOne = (req, res) => {
  Msg.getId(req.params.id, (err, result) => {
    if (err){
      if (err.kind === "Pas trouvé") {
        res.status(404).send({
          message: `Ce Msg n'exite pas ${req.params.id} .`
        });
      } else {
        res.status(500).send({
          message: "Retrouve pas ce Msg " + req.params.id
        });
      }
    } else
    res.send(result)
  });
}


//deleteOne
exports.delete = (req, res) => {
  Msg.remove(req.params.id, (err, data) => {
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
    } else res.send({ message: `Msg supprimé =!` });
  });
};
