const User = require("../Models/user-model");
// const bcrypt = require('bcrypt');
// const dbConfig = require("../middleware/db.config");
// const jwt = require('jsonwebtoken')

// const {validationRegister, loginValidation} = require('../middleware/validation')
 
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


//findOne
exports.findOne = (req, res) => {
  User.getId(req.params.id, (err, data) => {
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


exports.signout = (req, res) => {
  User.signoutId(req.params.id), (err, res)=> {
    
  }
}



// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//       return;
//     });
//   });
// };

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
// };
