const dotenv = require("dotenv");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
