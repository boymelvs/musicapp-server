const db = require("../database/dbConnect");

exports.update = (req, res) => {
   const { id, first_name, last_name } = req.body;

   const receivedImage = req.files.image[0];

   const getImagePath = req.protocol + "://" + req.get("host") + "/public/uploads/" + receivedImage.filename;

   const myQuery = `UPDATE users SET first_name=?, last_name=?, image=? WHERE user_id = ?`;

   db.query(myQuery, [first_name, last_name, getImagePath, id], (err, results) => {
      if (err) {
         return console.log(err.message);
      }
      res.status(200).json({ message: "Update Successfully", image: getImagePath });
   });
};
