import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";

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
      </head>
      <body>
        <pre>{"message":"It works"}</pre>
        <div class="json-formatter-container"></div>
      </body>
    </html>
  `);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
