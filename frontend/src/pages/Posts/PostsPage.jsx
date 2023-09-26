import React, { useEffect, useState } from 'react';
import PostsService from '../../services/PostsService';
import { useDispatch, useSelector } from 'react-redux';
import { getPostHendler } from '../../store/postsSlice';
import Card from '../../components/Card/Card';
import spinnerPosts from '../../assets/spinnerPosts.svg';
import SearchAndCreatePost from '../../components/SearchAndCreatePost/SearchAndCreatePost';



function PostsPage() {
	const [isLoading, setIsLoading] = useState(true);

	const { allPosts, addRemoveLikes } = useSelector(
		(state) => state.postsStore
	);

	const dispatch = useDispatch();

	useEffect(() => {
		PostsService.getAllPosts()
			.then((res) => {
				dispatch(getPostHendler(res.data));
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [addRemoveLikes]);

	return (
		<main className='flex my-10 gap-10 max-[768px]:flex-col '>

			<SearchAndCreatePost />

			<section className='w-[70%] max-[768px]:w-full'>
				{/* spinner is loaded if data is NOT present */}
				{isLoading ? (
					<div className='w-full flex items-center justify-center h-[60vh]'>
						<img
							src={spinnerPosts}
							alt='spinner representation'
							className='w-16'
						/>
					</div>
				) : (
					<>
						<div className='grid grid-cols-3 gap-4 max-[1280px]:grid-cols-2 max-[1024px]:grid-cols-1'>
							{allPosts.slice(5).map((post) => (
								<Card key={post._id} post={post} />
							))}
						</div>
						<h2>pagination...</h2>
					</>
				)}
			</section>

		</main>
	);
}

export default PostsPage;
