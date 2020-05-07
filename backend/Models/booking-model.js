const pool = require("../middleware/dbConnect");


// constructor
const Booking = function(booking) {
  this.email = booking.email;
  this.name = booking.name;
  this.checkIn = booking.checkIn;
  this.checkOut = booking.checkOut;
  this.createdAt = booking.createdAt;
  this.giteId = booking.giteId;
  //FKMAPS

};
  
Booking.create = (newBooking, result) => {
  pool.query("INSERT INTO bookings SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created booking client: ", { 
      id: res.insertId, ...newBooking 
    });
    result(null, { 
      id: res.insertId, ...newBooking
    });
  });
};

Booking.getAll = result => {
  pool.query("SELECT * FROM bookings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Liste des bookings: ", res);
    result(null, res);
  });

};



Booking.getId = (id, result) => {
  pool.query(`SELECT * FROM bookings WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found booking with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Booking.updateId = (id, booking, result) => {
  pool.query('UPDATE bookings SET name = ?, email = ?, bathrooms = ?, address = ?, wifi = ?, terrasse = ?, photos = ? WHERE id = ?',
    [booking.name, booking.email, booking.surface, booking.address, booking.wifi, booking.terrasse, booking.photos, id],
      (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
  });
}


Booking.remove = (id, result) => {
  pool.query(`DELETE FROM bookings WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("booking supprimé", id);
    result(null, res);
  });
};

//list des bookings finis (& payé)
Booking.oldest = (result) => {
  pool.query(`SELECT * FROM bookings LEFT JOIN gites on gites.id = bookings.id and NOW() >= bookings.checkIn and NOW() <= bookings.checkOut WHERE bookings.id is null`, (error, results, fields) => {
    if (error) {
        console.log("error: ", error);
        results(null, error);
        return;
      }
  
      console.log("anciens bookings");
      result(null, res);
    });
}

//nouveau bookings the last 48 hours, order by desc
Booking.newest = (result) => {
pool.query(`SELECT * FROM bookings WHERE checkIn > UNIX_TIMESTAMP(NOW() - INTERVAL 48 HOUR) ORDER BY date(createdAt) DESC
`, (error, results, fields) => {
  if (error) {
      console.log("error: ", error);
      results(null, error);
      return;
    }

    console.log("nouveaux bookings");
    result(null, res);
  });
}

//annulé un booking sous 24H
Booking.annulled24hours = (id, result) => {
  pool.query(`DELETE FROM bookings WHERE checkIn < UNIX_TIMESTAMP(NOW() - INTERVAL 24 HOUR AND WHERE id = ${id}`, (error, results, fields) => {
  if (error) {
    console.log("error: ", error);
    results(null, error);
    return;
  }

  console.log("supprimé booking under 24 hours");
  result(null, res);
  });
}


module.exports = Booking;
