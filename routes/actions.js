const router = require('express').Router();
const User = require('../models/user');
// const auth = require('../auth/auth');



router.get('/search', async (req, res) => {
    const { user } = req.query
    User.findOne({username: user})
    .then(user => {

        if (!user) {
            return res.status(400).json({msg: 'account not found.'})
        };

        res.json({
            user: user.username,
            id: user._id
        })
    })
    .catch(err => {
        res.status(500).json({msg: 'Server error'});
    })
})


module.exports = router;