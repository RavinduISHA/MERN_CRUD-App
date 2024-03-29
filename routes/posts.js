const express = require('express');
const posts = require('../models/posts');

const Posts = require('../models/posts');

const router = express.Router();

//to post save
router.post('/post/save',(req,res)=>{
    let newPost = new Posts(req.body);

    newPost.save((err)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Your Posts are Successfully Saved"
        });
    });

});

//to get posts
router.get('/posts',(req,res)=>{
    Posts.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//update posts
router.put('/post/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Updated Successfully........"
            });
        }
    );
});

//to delete post

router.delete('/post/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost)=>{

        if(err) return res.status(400).json({
            message:"Successfuly Deleted.....",err
        });
        return res.json({
            message:"Successfuly Deleted.....",deletedPost
        });
    });
});

//get you wat post
router.get("/post/:id",(req,res)=>{
    let postId = req.params.id;

    Posts.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }return res.status(200).json({
            success:true,
            post
        });
    });
});
module.exports = router;