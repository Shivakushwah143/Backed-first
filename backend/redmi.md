{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
     "build:client": "cd client && npm install && npm run build",
  "build": "npm install && npm run build:client"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "description": "",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cloudinary": "^2.5.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-rate-limit": "^7.5.0",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.5",
    "multer": "^1.4.5-lts.1"
  }
}
