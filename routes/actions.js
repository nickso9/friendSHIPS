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

        let friendresult;

        User.findByIdAndUpdate({ _id: user }, { $addToSet: { friends: userToAdd } })
            .then(() => {    
                return User.findByIdAndUpdate({_id: userToAdd}, { $addToSet: { friends: user } })       
            })
            .then(() => {     
                return User.findById({ _id: user }).populate('friends', '-email -password -messages -friends')
            })
            .then((result) => {
                friendresult = result
                return User.findByIdAndUpdate({ _id: user }, { "$pull": { 'requestedfriend': { "id": userToAdd } } })   
            })
            .then(() => {     
                res.status(200).json({
                    friends: friendresult.friends
                })
            })


    } catch (err) {
        res.status(500).json({ msg: 'unable to add friend.' })
    }

})

router.post('/pendingfriend', async (req, res) => {
    const { userToAdd, user, usernameToAdd, image } = req.body.body

    const addMe = {
        id: user,
        username: usernameToAdd,
        image
    }

    if (user === userToAdd) {
        return res.status(400).json({ msg: 'cannot add yourself.' })
    }

    try {
 
        const alreadyFriend = await User.find({_id: userToAdd}).where('friends').equals(ObjectID(user))
       
        if (alreadyFriend.length > 0) {
            return res.status(400).json({ msg: 'User is already your friend.' })
        }

        const alreadyPending = await User.find({ _id: user }).where('requestedfriend.id').equals(ObjectID(userToAdd))
        if (alreadyPending.length > 0) {
        
            return res.status(400).json({ msg: 'Your Friendship has already been requested.' })
        }

        const userCheck = await await User.find({ _id: userToAdd }).where('requestedfriend.id').equals(ObjectID(user))

        if (userCheck.length > 0) {
            
            return res.status(400).json({ msg: 'Friend request already pending.' })
        }

        await User.findByIdAndUpdate({ _id: userToAdd }, { $addToSet: { requestedfriend: addMe } })
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

router.get('/updatefriend', async (req, res) => {
    const { id } = req.query
    try {
        const findUser = await User.findById(id).populate('friends', '-email -password -messages -friends')
         
        if (!findUser) {
            res.status(400).json({msg: 'user not found.'})
        }
        console.log(findUser)
        res.json({ 
                id: findUser._id, 
                username: findUser.username,
                friendsList: findUser.friends,
                image: findUser.image,
                requestedfriend: findUser.requestedfriend
        });


    } catch (err) {
        res.status(500).json({msg: 'network error'})
    }
})


router.delete('/removefriend', (req, res) => {

    const { userToRemove, user } = req.body;

    let removeResult;
    User.findByIdAndUpdate({ _id: user }, { $pull: { friends: userToRemove } })
        .then(() => {
            return User.findById({ _id: user }).populate('friends', '-email -password -messages -friends')
        })
        .then((result) => {
            removeResult = result;
            return User.findByIdAndUpdate({ _id: userToRemove }, { $pull: { friends: user } })
        }) 
        .then(() => {
            res.status(200).json({
                friends: removeResult.friends
            })
        })
        .catch(() => {
            res.status(500).json({ msg: 'unable to remove friend.' })
        })

})

module.exports = router;