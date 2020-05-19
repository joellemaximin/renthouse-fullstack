// module.exports = app => {
//     const yup = require('../Controllers/auth');
  
//     app.post('/login', yup.login);
  
//     app.post('/register', yup.register);

//     // app.get('/signout', yup.signout)
// }

const express = require("express");
const router = express.Router();
const pool = require("../middleware/dbConnect");
const bcrypt = require('bcrypt');
const dbConfig = require("../middleware/db.config");
// const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const verified = require('../middleware/verifytoken')

router.use(express.json());
// dotenv.config()
// var session = require('express-session');
// const config = require('../middleware/config-session')
// router.use(session(config));

const {validationRegister, loginValidation} = require('../middleware/validation')

router.get("/", async (req, res) => {
  const getAllBooking = 'SELECT * FROM users';
  pool.query(getAllBooking, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
});


router.post("/register", async (req, res) => {
    // const { body } = req; 
    //validate the data before send it and show errors
    const { error } = validationRegister(req.body)
    if (error) return res.status(422).send(error.details[0].message);

    var userData = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        role: req.body.role
    }

    const user = userData;

    //salt the password and then check if email already exists if not 
    const salt = await bcrypt.genSalt(10);

    pool.query('SELECT * FROM users WHERE email= ?', [user.email], function(err, rows){

        if (err) throw err;
        
        if (!rows.length) {
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) console.log(err);
                user.password = hash;
                
                pool.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                    if (error) throw error;
                    res.send({user: user.username});
                }); 
            });
        }

        else {
            return res.send("Email already exists");
        }



    });

});


router.post('/login', (req, res)=> {
// `  const password = req.body.password


    var userData = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        role: req.body.role
    }

    const user = userData;

    pool.query('SELECT * FROM users WHERE email = ?',[user.email], function (error, results, fields) {
        if (error) {

            res.json({
              status:false,
              message:'there are some error with query'
            })

        } else {
            if(results.length > 0){
                //decided to authen only with email
                // if(password==results[0].password){
                if(user.email == results[0].email){
                    // res.json({
                    //   status:true,
                    //   message:'successfully authenticated'
                    // })
                    // console.log({id: results[0].id})


                    const token = jwt.sign({ id: results[0].id,
                        role: results[0].role,
                        username: results[0].username,
                    },
                    dbConfig.secret);

                    res.cookie('t', token, {expiresIn: 8460 })

                    res.status(200).send({

                        email: user.email,
                        role: user.role,
                        password: user.password,
                        accessToken: token
                    })
                   
                    
                } else {
                    res.json({
                        status:false,
                        message:"Email does not match"
                    });
                    res.end();

                }
           
            } else {
                res.json({
                    status:false,    
                    message:"Email does not exits"
                });
                res.end();

            }
        }
    });
    
});

//get profile when connected
router.get('/profile', verified, (req, res, next)=>{
    var userData = {
        email: req.user.email,
        username: req.user.username,
        role: req.user.role
    }

    const user = userData;

    console.log(req.user);
    console.log(user)
    res.json({
        username: req.user.username,
        role: req.user.role,
        email: req.user.email,

    })
    next()
    // res.send('This is the secret content. Only logged in users can see that!');
    //copie colle access-token after login
})

//profile update
router.put('/profile-update/:id', verified, (req, res, next)=>{
    var id = req.params.id
    var username = req.body.username
    

    const profileUpdate = `UPDATE users SET username="${username}" WHERE id=${id}`;
    pool.query(profileUpdate, (err, result) => {
        if(err) {
            res.status(500).send({ err: 'Something failed!' })
        }
        res.json(result)
    });
    
})


//post?s
router.get('/logout', verified, (req, res) => {
    res.clearCookie('t');
    res.json({message: "Signout successful"});
});


// router.get('/forgot-password', function(req, res, next) {
//     res.json({message: "Request accepted" });
// });


// router.post('/forgot-password', async function(req, res, next) {
//     //ensure that you have a user with this email
//     var email = await User.findOne({where: { email: req.body.email }});
//     if (email == null) {
//     /**
//      * we don't want to tell attackers that an
//      * email doesn't exist, because that will let
//      * them use this form to find ones that do
//      * exist.
//      **/
//       return res.json({status: 'ok'});
//     }
//     /**
//      * Expire any tokens that were previously
//      * set for this user. That prevents old tokens
//      * from being used.
//      **/
//     await ResetToken.update({
//         used: 1
//       },
//       {
//         where: {
//           email: req.body.email
//         }
//     });
   
//     //Create a random reset token
//     var fpSalt = crypto.randomBytes(64).toString('base64');
   
//     //token expires after one hour
//     var expireDate = new Date();
//     expireDate.setDate(expireDate.getDate() + 1/24);
   
//     //insert token data into DB
//     await ResetToken.create({
//       email: req.body.email,
//       expiration: expireDate,
//       token: token,
//       used: 0
//     });
   
//     //create email
//     const message = {
//         from: process.env.SENDER_ADDRESS,
//         to: req.body.email,
//         replyTo: process.env.REPLYTO_ADDRESS,
//         subject: process.env.FORGOT_PASS_SUBJECT_LINE,
//         text: 'To reset your password, please click the link below.\n\nhttps://'+process.env.DOMAIN+'/user/reset-password?token='+encodeURIComponent(token)+'&email='+req.body.email
//     };
   
//     //send email
//     transport.sendMail(message, function (err, info) {
//        if(err) { console.log(err)}
//        else { console.log(info); }
//     });
   
//     return res.json({status: 'ok'});
//   });
module.exports = router;