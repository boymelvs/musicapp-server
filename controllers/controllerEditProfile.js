const db = require("../database/dbconnect");

exports.update = (req, res) => {
   const { id, first_name, last_name } = req.body;

   const myQuery = `UPDATE users SET first_name=?, last_name=? WHERE user_id = ?`;

   db.query(myQuery, [first_name, last_name, id], (err, results) => {
      if (err) {
         return console.log(err.message);
      }
      res.status(200).json({ message: "Update Successfully" });
   });
};
