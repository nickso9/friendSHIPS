const router = require('express').Router();
const { ObjectID } = require('mongodb');
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


router.post('/addfriend', async (req, res) => {
    const { userToAdd, user } = req.body.body

    if (user === userToAdd) {
        return res.status(400).json({ msg: 'cannot add yourself.' })
    }

    try {

        const userCheck = await User.findById({ _id: user }).where('friends').equals(ObjectID(userToAdd))

        if (userCheck) {
            return res.status(400).json({ msg: 'user is already your friend.' })
        }

        User.findByIdAndUpdate({ _id: user }, { $addToSet: { friends: userToAdd } })
            .then((e) => {
                return User.findById({ _id: user }).populate('friends', '-email -password -messages -friends')
            })
            .then(result => {
                res.status(200).json({
                    friends: result.friends
                })
            })


    } catch (err) {
        res.status(500).json({ msg: 'unable to add friend.' })
    }

})

router.post('/pendingfriend', async (req, res) => {

    const { userToAdd, user, usernameToAdd } = req.body.body

    if (user === userToAdd) {
        return res.status(400).json({ msg: 'cannot add yourself.' })
    }

    try {
        const userCheck = await User.findById({ _id: userToAdd }).where('requestedfriend').equals(ObjectID(user))

        if (userCheck) {
            return res.status(400).json({ msg: 'Friend request already pending.' })
        }

        await User.findByIdAndUpdate({ _id: userToAdd }, { $addToSet: { requestedfriend: { [user]: usernameToAdd } } })
            .then(() => {
                res.status(200).json({
                    msg: 'Requested friend.'
                })
            })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'unable to add friend.' })
    }

})

router.delete('/removefriend', (req, res) => {

    const { userToRemove, user } = req.body;

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