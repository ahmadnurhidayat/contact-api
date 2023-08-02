require("dotenv").config();

const express = require("express");

const userRoutes = require("./routes/contact");

const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/contacts", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
