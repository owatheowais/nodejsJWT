const router = require('express').Router();
// const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');





router.post('/register', async (req, res) => {

    //Validate the data before we create a user
   // const validation = Joi.validate(req.body,schema);
    // const validation = schema.validate(req.body);
    // res.send(validation);

    // // This is a shorter version
    // const { error } = schema.validate(req.body);

    const {error} = registerValidation(req.body);

    // Error in response
        // res.send(error.details[0].message);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking duplicate user in a database
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Creating new user
    //res.send('Register');
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        // res.send(savedUser);
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

// router.post('/login')

//USER LOGIN
router.post('/login',async (req,res)=>{
    //User login validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking user exist or not
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Email ID not exist');
    //Checking user password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    res.send('Logged in');
});

module.exports = router;