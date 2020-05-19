const pool = require("../middleware/dbConnect");
const bcrypt = require('bcrypt');
const dbConfig = require("../middleware/db.config");
const jwt = require('jsonwebtoken')



// constructor
const User = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
  this.price = user.price;
  this.commentID = user.commentId;
  this.photoID = user.photoID;
};



//  pool.query("SELECT roles.*, photos.`name` from roles INNER JOIN photos ON roles.`id` = photos.`id` INNER JOIN equipements ON roles.`id` = equipements.`id`", (err, res) => {

// User.createUsers = async (email, result) => {

//   const salt = await bcrypt.genSalt(10);

//   pool.query('SELECT * FROM users WHERE email= ?, username=? ', [email, username], (err, res) => {
//     if (err) throw err;
        
//     if (!result.length) {
//       bcrypt.hash(user.password, salt, function(err, hash){
//         if(err) console.log(err);
//         password = hash;
        
//         pool.query('INSERT INTO users SET ?', user, function (error, result, fields) {
//             if (error) throw error;
//             res.send({user: user.username});
//         }); 
//       });
//     }
  
//     else {
//       return res.send("Email already exists");
//     }
//   });
// };



// User.loginIn = ( username, password, result) => {

//   pool.query('SELECT * FROM users WHERE username = ?', [username], (err, res, fields) =>{
//     if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//     } else {
//       console.log('The solution is: ', result);
//         if (result.length > 0) {
//             console.log("User: ", res[0]);
//             if(
//                 res[0].password == password){
//                 result(null, "sucess");
//                 return;
//             // results(null, err);

//             }
//             else {
//                 result(null, "error, username and pass don'/t match");

//                 return;
//             }
//         }
//     }
//     //not found Users with the users ame
//     results({ kind: "Introuvable" }, null);
//     })
// };

 
User.getAll = result => {
    pool.query("SELECT * from users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Liste de users: ", res);
      result(null, res);
    });
  
};


User.getId = (id, result) => {
  pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("User: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Customer with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

User.updateId = (id, username, result) => {
  pool.query("UPDATE users SET = usernmae ='" + req.body.usernmae  + "' WHERE id = '" + req.body.id + "'", (err, res) => {
    if (err) throw err;
    console.log(result)
    res.send(result);
  });
}


User.deleteId = (id, result) => {
  sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users supprimé", id);
    result(null, res);
  });
};


module.exports = User;
