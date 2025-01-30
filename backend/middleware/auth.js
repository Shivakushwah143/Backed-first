

import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";  // Assuming you have this model for users
export const protectRoute = async (req, res, next) => {
	try {
	  // Get the token from cookies or headers
	  const token = req.cookies.jwt || req.headers.authorization?.replace("Bearer ", "");
  
	  console.log("Token received:", token); // Log the token for debugging
  
	  if (!token) {
		return res.status(401).json({
		  success: false,
		  message: "Unauthorized: Please log in to access this resource.",
		});
	  }
  
	  // Verify the token
	  const decoded = jwt.verify(token, process.env.JWT_SECRET);
	  console.log("Decoded token:", decoded); // Log the decoded token for debugging
  
	  if (!decoded) {
		return res.status(401).json({
		  success: false,
		  message: "Not authorized - Invalid token",
		});
	  }
  
	  // Find the user
	  const currentUser = await User.findById(decoded.userId);
  
	  if (!currentUser) {
		return res.status(401).json({
		  success: false,
		  message: "Not authorized - User not found",
		});
	  }
  
	  // Attach the user to the request object
	  req.user = currentUser;
  
	  // Proceed to the next middleware
	  next();
	} catch (error) {
	  console.log("Error in auth middleware: ", error);
  
	  if (error instanceof jwt.JsonWebTokenError) {
		return res.status(401).json({
		  success: false,
		  message: "Not authorized - Invalid token",
		});
	  } else {
		return res.status(500).json({
		  success: false,
		  message: "Internal server error",
		});
	  }
	}
  };
export default protectRoute;
