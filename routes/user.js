const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../auth/auth');

router.post('/tokenIsValid', async (req, res) => {

    try {
        const token = req.header('x-auth-token');

        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    };
})

router.get('/', auth, async (req, res) => {
    
    const user = await User.findById(req.user);

    res.json({
        username: user.username,
        id: user._id
    })
})


router.post('/register', async (req, res) => {
    
    try {
        let { email, password, passwordCheck, username } = req.body;
        
        if (!email || !password || !passwordCheck || !username) {
            return res.status(400).json({msg: 'all fields required.'})
        };
        if (password.length < 5) {
            return res.status(400).json({msg: 'password needs to be atleast 5 characters.'})
        };
        if (password !== passwordCheck) {
            return res.status(400).json({msg: "password doesn't match."})
        };

        const existingUser  = await User.findOne({email: email}) ;
        if (existingUser) {
            return res.status(400).json({msg: 'An account with this email already exists.'})
        }; 

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            email,
            password: passwordHash,
            username
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, { expiresIn: '1hr' });

        res.json({
            token, 
            user: {
                id: savedUser._id, 
                username: savedUser.username,
            }});

    } catch (error) {
        res.status(500).json({error: error.message})
    };
});


router.post('/login', async (req, res) => {
    
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({msg: 'email or password required.'})
        };

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({msg: 'account not found.'})
        };
        
        const checkPasswordMatch = await bcrypt.compare(password, user.password);

        if (!checkPasswordMatch) {
            return res.status(400).json({msg: 'invalid login credentials.'})
        };

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.json({
            token, 
            user: {
                id: user._id, 
                username: user.username,
            }});

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    };

});


module.exports = router;