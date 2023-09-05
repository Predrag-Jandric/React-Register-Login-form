import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/userSlice';
import { toast } from 'react-toastify';
import { toggleMenu } from '../../store/hamburgerSlice';

function MobileNavbar() {
	const user = useSelector((state) => state.userStore.user);
	const dispatch = useDispatch();

	function removeUser() {
		dispatch(logoutUser());
		toast.success('Successfully logged out', {
			position: 'bottom-right',
		});
	}

	const isMenuOpen = useSelector(
		(state) => state.hamburgerStore.isMenuOpen
	);

	const handleCloseMenu = () => {
		dispatch(toggleMenu());
	};

	return (
		<main
			className={`${isMenuOpen ? 'translate-x-0 opacity-1' : 'translate-x-[100vw] opacity-0'
				} bg-white flex flex-col items-center w-[90%] border-1 border-blue-300 rounded-5 drop-shadow-lg transition-all z-50 absolute top-[20%] lg:hidden`}>

			{/* user info IF present */}
			{localStorage.hasOwnProperty('sm_user') && (
				<>
					<div className='flex items-center flex-col gap-3 mt-7'>
						<img
							src={user.image}
							alt='logo'
							className='w-[60px] h-[60px] object-cover rounded-full border-1 border-gray-500'
						/>
						<p className='text-xl text-primary font-semibold'>
							{user.firstName} {user.lastName}
						</p>
					</div>
					<hr className='w-5/6 mt-2' />
				</>
			)}

			{/* pages */}
			<Link
				to={'/'}
				onClick={handleCloseMenu}
				className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7'>
				Home
			</Link>

			<Link
				to={'/posts'}
				onClick={handleCloseMenu}
				className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7'>
				Posts
			</Link>

			<Link
				to={'/ads'}
				onClick={handleCloseMenu}
				className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7'>
				Ads
			</Link>

			{/* user links IF present */}
			{localStorage.hasOwnProperty('sm_user') ? (
				<>
					<Link
						to={'/userProfile'}
						onClick={handleCloseMenu}
						className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7'>
						Profile
					</Link>

					<Link
						to={'/'}
						onClick={() => {
							removeUser();
							handleCloseMenu();
						}}
						className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7 mt-7'>
						Logout
					</Link>
				</>
			) : (
				// links IF user not present
				<>
					<Link
						to={'/register'}
						onClick={handleCloseMenu}
						className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7'>
						Register
					</Link>

					<Link
						to={'/login'}
						onClick={handleCloseMenu}
						className='text-lg justify-center w-full flex gap-4 items-center hover:pl-3 hover:bg-blue-100 transition-all py-4 px-7'>
						Login
					</Link>
				</>
			)}
		</main>
	);
}

export default MobileNavbar;
