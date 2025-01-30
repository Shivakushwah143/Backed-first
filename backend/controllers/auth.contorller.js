import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const Newuser = new User({
          email,
          password: hashedPassword,
        });
    
        await Newuser.save();
        console.log(`User registered: ${email}`); // Log registration
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
      }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        console.log(token);
        console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log it to check if it's loaded correctly

    
        console.log(`User logged in: ${email}`); // Log login
        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            user: {
              id: user._id,
              email: user.email,
              role: user.role // Include the role here
            }
          });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
      }
};


export const logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
        console.log('User logged out');
        
      } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Error logging out', error: error.message });
      }
};