const pool = require("../middleware/dbConnect");


// constructor
const Comments = function(comment) {
  this.body = comment.body;
  this.tilte = comment.tilte;

};
  
Comments.create = (newcomment, result) => {
  pool.query("INSERT INTO comments SET ?", newcomment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Comments: ", { 
      id: res.insertId, ...newcomment 
    });
    result(null, { 
      id: res.insertId, ...newcomment
    });
  });
};

Comments.getAll = result => {
  pool.query("SELECT * from comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Liste de categories: ", res);
    result(null, res);
  });

};

Comments.getId = (id, result) => {
  pool.query(`SELECT * FROM comments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Comments: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Comments with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Comments.updateId = (id, comment, result) => {
  pool.query('UPDATE comments SET name = ? WHERE id = ?',
    [comment.name, id],
      (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Comments with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
  });
}


module.exports = Comments;
