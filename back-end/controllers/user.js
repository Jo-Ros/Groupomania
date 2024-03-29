require('dotenv').config();
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        const userSaved = await user.save();
        if(!userSaved) return res.status(400).json({ error });
        res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        console.error(`Error has occured: ${error}`);
        res.status(500).json({ message: `Error has occured: ${error}` });
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(401).json({ error: 'Undefiened user' });
    
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).json({ error: 'Incorrect Password' });

        res.status(200).json({
            userId: user._id,
            userRole: user.role,
            token: jsonWebToken.sign(
                { userId: user._id, userRole: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
        })
    }
    catch (error) {
        console.error(`Error has occured: ${error}`);
        res.status(500).json({ message: `Error has occured: ${error}` })
    }
};