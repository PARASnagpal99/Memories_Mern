import mongoose from 'mongoose';
import PostMessage from '../modals/postMessage.js'

export const getPosts = async (req,res)=>{
       try {
          const postMessages = await PostMessage.find() ;
         //  console.log(postMessages)
          res.status(200).json(postMessages);
       } catch(err){
          res.status(404).json({message : err.message})
       }
}

export const createPost = async (req , res)=>{
       const post = req.body ;
       const newPost = new PostMessage({...post , creator : req.userId , createdAt : new Date().toISOString()}) ;
       try{
          await newPost.save() ;
          res.status(201).json(newPost);
       } catch(err){
          res.status(409).json({message : err.message});
       }
}

export const updatePost = async(req , res)=>{
   const { id: _id } = req.params;
   const post = req.body;
   try {
     if (!mongoose.Types.ObjectId.isValid(_id))  return res.status(404).send(`No Post with that ${_id}`);
     const updatedPost = await PostMessage.findByIdAndUpdate(_id , {...post , _id} , {new: true});
     res.status(201).json(updatedPost);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
}

export const deletePost = async(req,res)=>{
       const { id: _id } = req.params;
      try{
         if (!mongoose.Types.ObjectId.isValid(_id))  return res.status(404).send(`No Post with that ${_id}`);
         await PostMessage.findByIdAndRemove(_id);
         res.status(201).json({message : 'Post deleted Successfully'});
      }catch(error){
         res.status(500).json({ message: error.message });
      }
}

export const likePost = async(req , res)=>{
   const { id } = req.params;
  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    
    if (!mongoose.Types.ObjectId.isValid(id))  return res.status(404).send(`No Post with that ${id}`);

    const post = await PostMessage.findById(id);
    //console.log(post);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    // console.log(index);
    if (index === -1) {
      //like post
      post.likes.push(req.userId);
    } else {
      // dislike
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    //console.log(updatedPost)

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}