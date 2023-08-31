const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')



router.get("/new",(req,res)=>{
    if(!req.session.userId){
        res.redirect("users/login")
    }else{
        Category.find({}).then(categories=>{
            res.render('site/addpost', {categories:categories})
        })
    }
})



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search",(req, res) => {
    if (req.query.look) {
       const regex = new RegExp(escapeRegex(req.query.look), 'gi');
       Post.find({ "title": regex }).populate({path:'author', model:User}).sort({$natural:-1}).then(posts =>{
        res.render('site/blog', {posts:posts})
       })
       }
})


router.get("/:id",(req,res)=>{
    Post.findById(req.params.id).populate({path:'author', model: User}).lean().then(post =>{
        Post.find({}).populate({path:'author', model: User}).lean().then(posts=>{
            res.render('site/post', {post:post, posts:posts})
        })
        
    })
})



router.post("/test",(req,res)=>{

    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))



    Post.create({
        ...req.body,
        post_image:`/img/postimages/${post_image.name}`,
        author : req.session.userId
    }, )

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Postunuz başarılı bir şekilde oluşturuldu.'
    }




    res.redirect('/blog')
})

module.exports = router