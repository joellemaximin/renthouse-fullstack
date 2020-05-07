// // const multer = require("multer");
// const Photo = require("../Models/photos-model");
// const signleUpload = upload.single('image');

// exports.findAll = (req, res) => {
//   Photo.getAll((err, data) => {
//   if (err)
//     res.status(500).send({
//       message:
//       err.message || "Quelques erreurs sont parvenus dans le controller Photo"
//     });
//   else res.send(data);
//   });
// };


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
  