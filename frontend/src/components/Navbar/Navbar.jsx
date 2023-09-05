import React from 'react';

// logo
import logo from '../../assets/logo.png';
import DesktopNavbar from './DesktopNavbar';

function Navbar() {
	return (
		<main className=' flex  items-center h-[90px] shadow-lg rounded-lg mt-[2rem] px-[2rem] border-1 border-blue-300 bg-white'>
			<img src={logo} alt='logo' className='w-48' />


			<DesktopNavbar />
		</main>
	);
}

export default Navbar;
