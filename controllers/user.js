const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'Registered Successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ access: token }); // Updated response format
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            users: {
                _id: user._id,
                email: user.email,
                __v: user.__v,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
};
