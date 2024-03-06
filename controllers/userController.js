const User = require('../models/User');

module.exports = {
    deleteUser: async(req, res) =>{
        try {
            await User.findByIdAndDelete(req.param.id)
            res.status(200).json('Sucessfully deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    },

    geteUser: async(req, res) =>{
        try {
            const user = await User.findById(req.param.id);

            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json('Sucessfully Deleted');
        } catch (error) {
            res.status(500).json(error)
        }
    },
}