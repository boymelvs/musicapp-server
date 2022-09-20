const express = require("express");
const path = require("path");
const db = require("./database/dbConnect");
const cors = require("cors");
const token = require("./controllers/controllerHomepage");
const morgan = require("morgan");
const app = express();

const port = process.env.PORT || process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(morgan("tiny"));

app.use("/", require("./routes/routesHomepage"));
app.use("/users", require("./routes/routesUser"));

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);

   db.connect((err) => {
      if (err) {
         console.log("Database Error:", err);
      } else {
         console.log("Database Successfuly Connected!");
      }
   });

   token.getToken();
});
