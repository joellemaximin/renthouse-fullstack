const User = require("../Models/auth-model");
// const pool = require("../middleware/dbConnect");

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller user"
      });
    else res.send(data);
  });
};

// //if user connect create a user
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs"
    });
  }

//   // Create a user
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  // Save user in the database
  User.createUser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller user."
      });
    else res.send(data);
  });
};


//if user create, find it and login
exports.login = (req, res) => {
    
    User.loginIn(req.body.username, req.body.password, (err, data) => {   
        if (err)
            res.status(500).send({
            message:
                err.message || "Quelques erreurs sont parvenus dans le controller user"
            });
        else res.send(data);
    });
};


//findOne
exports.findOne = (req, res) => {
    User.getId(req.params.id, (err, res) => {
    if (err){
      if (err.kind === "Pas trouvé") {
        res.status(404).send({
          message: `Cet user n'exite pas ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Retrouve pas cet user " + req.params.id
        });
      }
    } else res.send(data)
  });
}


//deleteOne
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
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
    } else res.send({ message: `user supprimé =!` });
  });
};