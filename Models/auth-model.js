const pool = require("../middleware/dbConnect");


// constructor
const User = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};
  
User.createUser = (newUser, result) => {
  pool.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created User: ", { 
      id: res.insertId, ...newUser 
    });
    result(null, { 
      id: res.insertId, ...newUser
    });
  });
};


User.loginIn = ( username, password, result) => {

  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, res, fields) =>{
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    } else {
      console.log('The solution is: ', result);
        if (result.length > 0) {
            console.log("User: ", res[0]);
            if(
                res[0].password == password){
                result(null, "sucess");
                return;
            // results(null, err);

            }
            else {
                result(null, "error, username and pass don'/t match");

                return;
            }
        }
    }
    //not found User with the user ame
    results({ kind: "Introuvable" }, null);
    })
};


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

User.updateId = (id, result) => {
  pool.query(`UPDATE user SET = ? WHERE id = ${id}`, (err, res) => {
    if (error) throw error;
    console.log(result)
    res.send(result);
  });
}


User.remove = (id, result) => {
  sql.query(`DELETE FROM user WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User supprimé", id);
    result(null, res);
  });
};


module.exports = User;
