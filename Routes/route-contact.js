const express = require("express");
const router = express.Router();
const pool = require("../middleware/dbConnect");
const verified = require('../middleware/verifytoken');
const sendMail = require("../services/nodemailer");

//////////TEST NODEMAILER MAILGUN POUR BOOKING AND LOGIN JWT AND RESET PWD
router.use(express.json());

const {contactValidation} = require('../middleware/validation')

router.get("/send-contact", async (req, res) => {
  const contactForm = 'SELECT * FROM contact';
  pool.query(contactForm, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
});

router.post("/contact-us", async (req, res) => {
  //validate the data before send it and show errors
  // const { error } = contactValidation(req.body)
  // if (error) return res.status(422).send(error.details[0].message);

  const {subject, text, email} = req.body
  // console.log(req.body)

  sendMail(email, text, subject, function(err, data) {
    if(err) throw err;
    res.json({data, message: 'msg sent'})
  })
});



module.exports = router;