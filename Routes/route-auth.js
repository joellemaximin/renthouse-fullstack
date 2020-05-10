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


    const email = req.body.email;
    const username = req.body.username
    const password = req.body.password

    pool.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {

            res.json({
              status:false,
              message:'there are some error with query'
            })

        } else {
            if(results.length > 0){
                //decided to authen only with email
                // if(password==results[0].password){
                if(email == results[0].email){
                    // res.json({
                    //   status:true,
                    //   message:'successfully authenticated'
                    // })
                    // console.log({id: results[0].id})


                    const token = jwt.sign({ id: results[0].id },
                    dbConfig.secret);

                    res.cookie('t', token, {expiresIn: 8460 })

                    // const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})

                    // const response = {
                    //     "status": "Logged in",
                    //     "token": token,
                    //     "refreshToken": refreshToken,
                    // }
                    // res.status(200).json(response);        

                    res.status(200).send({

                        email: email,
                        password: password,
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


router.get('/secret-route', verified, (req, res, next)=>{
    const username = req.body.username

    if (req.user.role != 'admin') {
        res.json({message: 'Permission denied.' });
    }
    if (req.user.role != 'client') {
        res.json({message: 'Permission denied.' });
    }
    else {
        next();
    }

    console.log(req.user, 'id, time');
    console.log(req.body.email, req.body.username)
    res.send('This is the secret content. Only logged in users can see that!');
    //copie colle access-token after login
})

router.post('/logout', verified, (req, res) => {
    res.clearCookie('t');
    res.json({message: "Signout successful"});
});

module.exports = router;