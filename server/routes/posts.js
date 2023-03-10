import express from 'express' ;
const router = express.Router() ;
import { getPosts , createPost , updatePost , deletePost , likePost} from '../controllers/posts.js';

router.route('/').get(getPosts).post(createPost);
router.route('/:id').patch(updatePost).delete(deletePost);
router.route('/:id/likePost').patch(likePost)
export default router ;