import React from 'react';
import moment from 'moment';
import { AiFillLike } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { addRemoveLikesAction } from '../../store/postsSlice';
import PostsService from '../../services/PostsService';
import { Link } from 'react-router-dom';
import { MdContentPasteSearch } from 'react-icons/md';

function Card({ post }) {
	const user = JSON.parse(localStorage.getItem('sm_user'));

	const dispatch = useDispatch();

	function addRemoveLikeHandler() {
		PostsService.addRemoveLikesAxios(post._id)
			.then((res) => {
				dispatch(addRemoveLikesAction());
			})
			.catch((err) => console.log(err));
	}

	// TODO: finish this when you can add new post!
	// remove post
	function removePostHandler() {
		PostsService.removePost(post._id)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}

	return (
		<main className='flex flex-col border-1 border-blue-300 rounded-lg overflow-hidden '>
			<section className='relative '>
				<div className='absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50 hover:opacity-0 transition-all' />
				<img
					src={post.image}
					alt='tihomir'
					className='h-[150px] w-full object-cover'
				/>
				<p className='absolute top-[10px] left-[15px] text-white'>
					{post.user.firstName} {post.user.lastName}
				</p>
				<p className='absolute top-[30px] left-[15px] text-white'>
					{moment(post.createdAt).format('ddd, MMM D, a h')}
				</p>
				<ImBin title="Remove Post" className='bg-slate-200 absolute top-[13px] right-[13px] w-9 h-9 p-2.5 rounded-full hover:cursor-pointer hover:bg-red-500 hover:text-white transition' onClick={removePostHandler} />
			</section>

			{/* text section */}
			<section className='m-3 flex flex-col gap-5 h-full'>
				<ul className='flex gap-1'>
					{post.tags.map((tag, i) => {
						return (
							<li key={i} className='text-gray-500 text-sm'>
								#{tag.name}
							</li>
						);
					})}
				</ul>

				<h1 className='font-bold text-xl'>{post.title}</h1>

				<p>{post.body.substring(0, 50)}...</p>

				<article className='flex items-end justify-between flex-grow'>
					<div title="Like this post" onClick={addRemoveLikeHandler} className='flex items-center gap-2 bg-primary px-[0.7rem] rounded-5 py-[4px] transition-colors text-white hover:bg-primary_hover hover:cursor-pointer'>
						<AiFillLike />
						Likes:
						{post.likeInfo?.usersId.includes(user._id) ? (
							<span className='font-semibold italic bg-blue-500 px-1 rounded-full'>
								{post.likeInfo?.users.length
									? post.likeInfo?.users.length
									: 0}
							</span>
						) : (
							<span className='text-white px-1 '>
								{post.likeInfo?.users.length
									? post.likeInfo?.users.length
									: 0}
							</span>
						)}

					</div>

					<div title="See more details" className='flex items-center gap-2 bg-primary px-[0.7rem] rounded-5 py-[4px] transition-colors text-white hover:bg-primary_hover hover:cursor-pointer'>
						<MdContentPasteSearch />
						<Link className='' to={`/detailPost/${post._id}`}>Details</Link>
					</div>

				</article>

			</section>
		</main>
	);
}

export default Card;
