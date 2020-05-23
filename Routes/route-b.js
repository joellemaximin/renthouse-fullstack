const express = require("express");
const router = express.Router();
const pool = require("../middleware/dbConnect");
const verified = require('../middleware/verifytoken')
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
 
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
router.get("/searchdate", (req, res) => {
  //validate the data before send it and show errors
  
  const checkIn = req.query.checkIn;
  const checkOut = req.query.checkOut;
  const giteId = req.query.giteId;


  // check if the date is not taken
  pool.query('SELECT count(*) FROM bookings where giteId = ' + giteId + ' and (( ' + checkIn + '  between checkIn and checkOut ) or (' + checkOut + '  between checkIn and checkOut ))'
, function(err, rows){
  console.log(req.query.checkIn)
  console.log(req.query.giteId)
  console.log(req.query.checkOut)
  console.log("rows : " + JSON.stringify(rows));
  console.log("row.length : " + rows.length);

    if (err) throw err;

    if (rows.length >= 0) {
      console.log("not", rows.length)
      res.json(rows.length)
    } else {
      console.log("dezz", rows.length)
      res.json(rows.length)
    }
   
  });
})

//working on sql but not on request http using postman

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
          
              const nodemailerMailgun = nodemailer.createTransport(mg(auth));

              nodemailerMailgun.sendMail({
                from: process.env.SENDER_ADDRESS,
                to: req.body.email,
                replyTo: process.env.REPLYTO_ADDRESS,
                subject: process.env.FORGOT_PASS_SUBJECT_LINE,
                text: 'Votre réservation est bien enregistrée'
              });
            
              //send email
              transport.sendMail(message, function (err, info) {
                if(err) { console.log(err)}
                else { console.log(info); }
              });
   
              return res.status(200).json({
                  message: "Booking enregistré"
              })
              
            }); 
          }

        })



});




module.exports = router;