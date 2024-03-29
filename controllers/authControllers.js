// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const ErrorResponse = require('../utils/errorResponse')
// module.exports = {
//     createUser: async (req, res) => {
//         try {
//             const hashedPassword = await bcrypt.hash(req.body.password, 10);
//             const newUser = new User({
//                 username: req.body.username,
//                 email: req.body.email,
//                 location: req.body.location,
//                 password: hashedPassword,
//             });
//             await newUser.save();
//             res.status(201).json({ message: "User Successfully Created!" });
//         } catch (error) {
//             res.status(500).json({ message: error });
//         }
//     },

//     loginUser: async (req, res, next) => {
//         try {
//             const user = await User.findOne({ email: req.body.email });
//             if (!user) {
//                 return next(
//                   res.status(401).json({message: "Wrong Credentials. Provide a valid email."});  
//                 );
//             }

//             const isPasswordValid = await bcrypt.compare(req.body.password, User.password);
//             if (!isPasswordValid) {
//                 return next(
//                      res.status(401).json({message: "Wrong Password!"});   
//                 )
//             }

//             const userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//             const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
//             res.status(200).json({ ...userData, token: userToken });
//         } catch (error) {
//             res.status(500).json( new ErrorResponse("Invalid Crediantials")  );
//         }
//     }
// };

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/errorResponse');

module.exports = {
    createUser: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                location: req.body.location,
                password: hashedPassword,
            });
            await newUser.save();
            res.status(201).json({ success: true, message: "User Successfully Created!" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ success: false, message: "Wrong Credentials. Provide a valid email." });
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Wrong Password!" });
            }

            const userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
            res.status(200).json({ success: true, ...userData, token: userToken });
        } catch (error) {
            res.status(500).json({ success: false, message: "Invalid Credentials" });
        }
    }
};
