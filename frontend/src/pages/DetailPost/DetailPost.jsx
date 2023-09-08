import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsService from '../../services/PostsService';
import moment from 'moment';

function DetailPost() {
	const [postDetail, setPostDetail] = useState({});

	let { id } = useParams();

	useEffect(() => {
		PostsService.getSinglePost(id)
			.then((res) => setPostDetail(res.data))
			.catch((err) => console.log(err));
	}, [id]);

	// console.log(postDetail);

	return (
		<main className='flex bg-white py-6 my-10 p-5 gap-7 border-1 border-blue-300 rounded-5 drop-shadow-lg max-[1024px]:flex-col'>

			<section className='w-[60%] flex-col flex gap-4 max-[1024px]:w-full max-[1024px]:order-2'>
				<h1 className='text-3xl'>{postDetail.title}</h1>
				{postDetail.tags && <small className='text-slate-400 -mt-3'>{postDetail.tags.map(tag => `#${tag.name}`).join(' ')}</small>}
				<p>{postDetail.body}</p>
				<p className='text-lg'>Created by </p>
				<p className='text-sm -mt-4 text-slate-600'>{moment(postDetail.createdAt).fromNow()}</p>
				<hr className='w-5/6' />
			</section>

			<section className='w-[40%] max-[1024px]:w-full max-[1024px]:order-1'>
				<img className='rounded-3xl' src={postDetail.image} alt="representation missing" />
			</section>

		</main>
	);
}

export default DetailPost;
