// module.exports = app => {
//     const yup = require('../Controllers/booking');
  
//     app.post('/booking', yup.create);
    
//     //private setlist bookings
//     app.get('/bookings', yup.findAll);
  
//     app.get('/booking/:id', yup.findOne);
  
//     app.put('/booking/:id', yup.update);
  
//     app.delete('/booking/:id', yup.delete);

//     app.get('/bookings-past', yup.lastBookings);

//     app.delete('/bookings-annuled', yup.annuled)

// };

// module.exports = app => {
//     const yup = require('../Controllers/auth');
  
//     app.post('/login', yup.login);
  
//     app.post('/register', yup.register);

//     // app.get('/signout', yup.signout)
// }

const express = require("express");
const router = express.Router();
const pool = require("../middleware/dbConnect");
const verified = require('../middleware/verifytoken')

router.use(express.json());

const {bookingValidation} = require('../middleware/validation')

router.get("/", verified, async (req, res) => {
  const getAllBooking = 'SELECT * FROM bookings';
  pool.query(getAllBooking, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
});

//search if date is available
router.get("/search-date", (req, res) => {
  //validate the data before send it and show errors
  
  const checkIn = req.query.checkIn;
  const checkOut = req.query.checkOut;
  const giteId = req.query.giteId;


  // check if the date is not taken
  pool.query('SELECT count(*) FROM bookings where giteId = ' + giteId + ' and (( ' + checkIn + '  between checkIn and checkOut ) or (' + checkOut + '  between checkIn and checkOut ))'
, function(err, rows){
  console.log(req.query.checkIn)
  console.log(req.query.giteId)
  console.log(req.query.checkIn)

      if (!rows.length) {
        res.send('date available ')
        console.log(rows)

      } else {
        console.log(rows)

        res.send('date unvaila ')
      }
    });
  })
  // const existingParams = [booking.checkIn, booking.checkOut].filter(field => req.query[field]);

  // if (existingParams.length) {
  //     sql += " WHERE ";
  //     sql += existingParams.map(field => `${field} = ?`).join(" BETWEEN ");
  // }

  // pool.query(
  //   sql,
  //   existingParams.map(field => req.query[field]),
  //   function (error, results, fields) {
  //     res.json({"status": 200, "error": error, "response": results});
  //   }
//   // );
//   pool.query('SELECT * FROM bookings JOIN gites on gites.id = bookings.giteID WHERE bookings.`checkIn` >= 0 AND bookings.`checkOut` <= 0 OR bookings.`checkIn` <= 0 AND bookings.`checkOut` >= 0 ', [booking.checkIn, booking.checkOut, booking.giteId], function(err, rows){
      

//     // if(booking.checkIn >= 0 && booking.checkOut <= 0 ){
//     if(!rows.length ){
//       return res.status(200).json({
//         message: "Booking present"
//       })       
//     }
//   })
// })


//checkout
router.post("/add-booking", verified, async (req, res) => {
    //validate the data before send it and show errors
    const { error } = bookingValidation(req.body)
    if (error) return res.status(422).send(error.details[0].message);

    // const user = req.user;
    var addBooking = {
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        status: req.body.status,
        giteId: req.body.giteId,
        totalPrice: req.body.totalPrice,
        paid: req.body.paid
        //add user.id when connected
    }

    const booking = addBooking;

    //check if the date is not taken

    pool.query('SELECT * from bookings where checkin', [booking.checkIn, booking.checkOut], function(err, rows){
        

        if(rows.length ){

          return res.status(420).json({
            errors: {
              checkIn: 'is taken',
              checkOut: 'is taken',
            },
          });          

        } else {

            pool.query('INSERT INTO bookings SET ?', booking, function (error, results, fields) {
              if (error) throw error;
              return res.status(200).json({
                  message: "Booking enregistré"
              })
              
            }); 
          }

        })



});




module.exports = router;