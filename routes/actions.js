const router = require('express').Router();
const User = require('../models/user');
// const auth = require('../auth/auth');

router.get('/search', (req, res) => {
    const { user } = req.query
    User.findOne({ username: user })
        .then(user => {

            if (!user) {
                return res.status(400).json({ msg: 'account not found.' })
            };

            res.json({
                user: user.username,
                id: user._id
            })
        })
        .catch(err => {
            res.status(500).json({ msg: 'Server error' });
        })
})


router.post('/addfriend', (req, res) => {
    const { userToAdd, user } = req.body.body

    if (user === userToAdd) {
        return res.status(400).json({ msg: 'cannot add yourself.' })
    }

    User.findByIdAndUpdate({ _id: user }, { $addToSet: { friends: userToAdd } })
        .then(() => {
            return User.findById({ _id: user }).populate('friends', '-email -password -messages -friends')
        })
        .then(result => {
            res.status(200).json({
                friends: result.friends
            })
        })
        .catch(() => {
            res.status(500).json({ msg: 'unable to add friend.' })
    })

})

router.delete('/removefriend', (req, res) => {

    const { userToRemove, user } = req.body;
    console.log(userToRemove);
    console.log(user)

    User.findByIdAndUpdate({ _id: user }, { $pull: { friends: userToRemove } })
        .then(() => {
            return User.findById({ _id: user }).populate('friends', '-email -password -messages -friends')
        })
        .then(result => {
            res.status(200).json({
                friends: result.friends
            })
        })
        .catch(() => {
            res.status(500).json({ msg: 'unable to remove friend.' })
    })

})

module.exports = router;