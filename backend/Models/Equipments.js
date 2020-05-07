const pool = require("../middleware/dbConnect");


// constructor
const Equipment = function(equipment) {
  this.name = equipment.name;
  this.information = equipment.information;

};
  
Equipment.create = (newEquip, result) => {
  pool.query("INSERT INTO equipements SET ?", newEquip, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Equipment: ", { 
      id: res.insertId, ...newEquip 
    });
    result(null, { 
      id: res.insertId, ...newEquip
    });
  });
};

Equipment.getAll = result => {
  pool.query("SELECT * from equipements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Liste de categories: ", res);
    result(null, res);
  });

};

Equipment.getId = (id, result) => {
  pool.query(`SELECT * FROM equipements WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Equipment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Equipment with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Equipment.updateId = (id, equip, result) => {
  pool.query('UPDATE equipements SET name = ?, information = ? WHERE id = ?',
    [equip.name, equip.information, id],
      (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Equipment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
  });
}


module.exports = Equipment;
