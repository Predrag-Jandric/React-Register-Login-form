import axios from 'axios';

class PostsService {
	static getAllPosts = () => axios.get('/posts/all');
	static addRemoveLikesAxios = (postId) =>
		axios.post(`/likes/addRemove/${postId}`);
	static removePost = (postId) =>
		axios.delete(`/posts/singlePost/${postId}`);
	static getSinglePost = (postId) =>
		axios.get(`/posts/singlePost/${postId}`);
}

export default PostsService;
