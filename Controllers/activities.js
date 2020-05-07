const Activity = require("../Models/activity-model");

exports.findAll = (req, res) => {
  Activity.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller Activity"
      });
    else res.send(data);
  });
};

//if user connect create a activities
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs"
    });
  }

  // Create a gite
  const activity = new Activity({
    title_activity: req.body.title_activity,
    location: req.body.location,
    link: req.body.link,
    category_id: req.body.category_id,


  });

  // Save activities in the database
  Activity.create(activity, (err, data) => {
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
    Activity.getId(req.params.id, (err, res) => {
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
    } else res.send(data)
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

  Activity.updateId(
    req.params.id,
    new Activity(req.body),
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
    Activity.remove(req.params.id, (err, data) => {
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
    } else res.send({ message: `Activities supprimé =!` });
  });
};