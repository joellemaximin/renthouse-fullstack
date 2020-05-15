const Comments = require("../Models/comment-model");
const {commentValidation} = require('../middleware/validation')

exports.findAll = (req, res) => {
  Comments.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller Comments"
      });
    else res.send(data);
  });
};

//if user connect create a activities
exports.create = (req, res) => {

    const { error } = commentValidation(req.body)
    if (error) return res.status(422).send(error.details[0].message );
  
//   // Validate request
//     if (!req.body) {
//         res.status(400).send({
//         message: "Veuillez remplir les champs"
//         });
//     }


  // Create a gite
    const comment = new Comments({
        body: req.body.body,
        // img: req.body.img

    });

    // Save activities in the database
    Comments.create(comment, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Quelques erreurs sont parvenus dans le controller activities."
        });
        else res.send(data);
    });


};

//findOne
exports.findOne = (req, res) => {
    Comments.getId(req.params.id, (err, resultat) => {
    if (err){
      if (err.kind === "Pas trouvé") {
        res.status(404).send({
          message: `Cette activitée n'exite pas ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Retrouve pas cette activitée " + req.params.id
        });
      }
    } else res.send(resultat)
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

  Comments.updateId(
    req.params.id,
    new Comments(req.body),
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
    Comments.remove(req.params.id, (err, data) => {
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
      } else res.send({ message: `Comments supprimé =!` });
    });
  };