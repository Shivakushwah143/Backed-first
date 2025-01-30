// import express from "express";

// import { conectDb } from "./lib/db.js";
// import authRoute from "./routes/auth.route.js"
// import cookieParser from "cookie-parser";
// import productRoute from "./routes/product.route.js"
// import dotenv from 'dotenv';
// import path from 'path';
// import cors from 'cors'; 
// dotenv.config();
// const app = express();
// app.use(express.json()); 

// const __dirname = path.resolve();

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

// // Finally client-side routing
// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// }
// // Use cookie-parser middleware
// app.use(cookieParser());
// app.use("/api/products",productRoute)
// app.use("/api/auth", authRoute)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);

// });

// conectDb();


import express from "express";
import { conectDb } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.route.js";
import dotenv from 'dotenv';
import cors from 'cors'; // Add CORS for frontend-backend communication
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, // Your frontend URL
  credentials: true // Allow cookies
}));

// Routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  conectDb();
});