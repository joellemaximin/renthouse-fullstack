const pool = require("../middleware/dbConnect");



// constructor
const Msg = function(msg) {
//   this.userId = user.user_id;
  this.title = msg.title;
  this.body = msg.body;

};
 
Msg.getAll = result => {
    pool.query("SELECT * from message", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Liste de message: ", res);
      result(null, res);
    });
  
};


Msg.getId = (id, result) => {
  pool.query(`SELECT * FROM message WHERE id = ${id}`, (err, res) => {
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

// Msg.updateId = (id, body, result) => {
//   pool.query("UPDATE message SET = usernmae ='" + req.body.usernmae  + "' WHERE id = '" + req.body.id + "'", (err, res) => {
//     if (err) throw err;
//     console.log(result)
//     res.send(result);
//   });
// }


Msg.deleteId = (id, result) => {
  sql.query(`DELETE FROM message WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("message supprimé", id);
    result(null, res);
  });
};


module.exports = User;
