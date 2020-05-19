const pool = require("../middleware/dbConnect");


// constructor
const Category = function(category) {
  this.title = category.title;

  //FKMAPS

};
  
Category.create = (newCategory, result) => {
  pool.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { 
      id: res.insertId, ...newCategory 
    });
    result(null, { 
      id: res.insertId, ...newCategory
    });
  });
};

Category.getAll = result => {
  pool.query("SELECT * from categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Liste de categories: ", res);
    result(null, res);
  });

};

Category.getId = (id, result) => {
  pool.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found category with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Category.updateId = (id, category, result) => {
  pool.query('UPDATE categories SET title = ? WHERE id = ?',
    [category.title, id],
      (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
  });
}


module.exports = Category;
