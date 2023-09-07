import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/userSlice';
import MobileNavbar from './components/Navbar/MobileNavbar'

function AppLayout() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			restoreUser(JSON.parse(localStorage.getItem('sm_user')))
		);
	});

	return (
		<main className='flex flex-col bg-page_bg min-h-screen w-full'>
			<div className='w-[90%] mx-auto'>
				<Navbar />
				<MobileNavbar />
				<Outlet />

			</div>
		</main>
	);
}

export default AppLayout;
