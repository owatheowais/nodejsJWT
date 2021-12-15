const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
    //res.send('On Post');  
    try {
        const posts = await User.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

//Specific User
router.get('/:_id', verify,async (req, res) => {
    try {
        // console.log(req.params.postId);
        const post = await User.findById(req.params._id);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

// router.get('/',verify,(req,res)=>{
//     try {
//         const posts = await Post.find();
//         res.json(posts);
//     } catch (err) {
//         res.json({ message: err });
//     }
// //     res.json({
// //         posts:{
// //             title:'my first post',
// //             description:'random data'
// //         }
// //     });
//     // res.send(req.user);
//     // User.findbyOne({_id:req.user})
//     UserController.getAllUsers(req.params).then(user => res.send(user))
// });

module.exports=router;