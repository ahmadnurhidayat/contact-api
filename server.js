const dotenv = require("dotenv");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

// Landing page
app.get("/", (req, res) => {
  res.send(
    <html>
      <body>
        <h1>Welcome to the Contact API</h1>
        <p>Please use /api/auth to get started</p>
      </body>
    </html>
  );
});

app.use('/api', authRoutes);
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
