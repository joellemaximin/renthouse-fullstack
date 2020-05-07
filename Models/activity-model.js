const pool = require("../middleware/dbConnect");


// constructor
const Activity = function(activity) {
  this.title_activity = activity.title_activity;
  this.location = activity.location;
  this.link = activity.link;
  this.categgory_id = activity.categgory_id
  //FKMAPS

};
  
Activity.create = (newActivity, result) => {
  pool.query("INSERT INTO activities SET ?", newActivity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created activity: ", { 
      id: res.insertId, ...newActivity 
    });
    result(null, { 
      id: res.insertId, ...newActivity
    });
  });
};

Activity.getAll = result => {
  pool.query("SELECT activities.*, categories.`title` from activities INNER JOIN categories ON activities.`category_id` = categories.`id`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Liste de activities: ", res);
    result(null, res);
  });

};

Activity.getId = (id, result) => {
  pool.query(`SELECT * FROM activities WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("activity: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "Introuvable" }, null);
  
  });
}

Activity.updateId = (id, result) => {
  pool.query(`UPDATE activities SET = ? WHERE id = ${id}`, (err, res) => {
    if (error) throw error;
    console.log(result)
    res.send(result);
  });
}


Activity.remove = (id, result) => {
  sql.query(`DELETE FROM activities WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("activity supprimé", id);
    result(null, res);
  });
};


module.exports = Activity;
