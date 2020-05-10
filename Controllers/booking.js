const Booking = require("../Models/booking-model");

exports.findAll = (req, res) => {
  Booking.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller bookign"
      });
    else res.send(data);
  });
};

//if user connect create a bookign
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs"
    });
  }

  // Create a bookign
  const booking = new Booking({
    name: req.body.name,
    email: req.body.email,
    createdAt: req.body.createdAt,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    bookignId: req.body.bookignId
  });

  // Save bookign in the database
  Booking.create(booking, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller bookign."
      });
    else res.send(data);
  });


};


//update one
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Veuillez remplir les champs!"
    });
  }

  Booking.updateId(
    req.params.id,
    new Booking(req.body),
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
  Booking.remove(req.params.id, (err, data) => {
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
    } else res.send({ message: `bookign supprimé =!` });
  });
};

//findOne booking
exports.findOne = (req, res) => {
  Booking.getId(req.params.id, (err, results) => {
    if (err){
      if (err.kind === "Pas trouvé") {
        res.status(404).send({
          message: `Ce bookign n'exite pas ${req.params.id} .`
        });
      } else {
        res.status(500).send({
          message: "Retrouve pas ce bookign " + req.params.id
        });
      }
    } else
    res.send(results)
  });
}

//display last bookings
exports.lastBookings = (req, res) => {
  Booking.oldest((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller bookign"
      });
    else res.send(data);
  });
}

exports.annuled = (req, res) => {
  Booking.annulled24hours((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Quelques erreurs sont parvenus dans le controller bookign"
      });
    else res.send(data);
  });
}