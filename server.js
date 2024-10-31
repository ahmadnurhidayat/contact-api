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
  res.send(`
    <html>
      <head>
        <title>Contact API</title>
        <style>
          html, body {
            height: 100%;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .container {
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to the Contact API</h1>
          <p>Please use /api/auth to get started</p>
        </div>
      </body>
    </html>
  `);
});

app.use('/api', authRoutes);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
