import express from "express";

import { conectDb } from "./lib/db.js";
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.route.js"
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json()); 

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Finally client-side routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
// Use cookie-parser middleware
app.use(cookieParser());
app.use("/api/products",productRoute)
app.use("/api/auth", authRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});

conectDb();