import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/userSlice';
import { MdOutlineMenu } from "react-icons/md"
import { toggleMenu } from '../../store/hamburgerSlice';

function DesktopNavbar() {

    const { user } = useSelector((state) => state.userStore);

    const dispatch = useDispatch();

    function removeUser() {
        dispatch(logoutUser());
        toast.success('Successfully logged out', {
            position: 'bottom-right',
        });
    }

    // hamburger menu
    const handleMenuClick = () => {
        dispatch(toggleMenu());
    };

    return (
        <>
            <main className='flex items-center justify-between w-full max-[1024px]:hidden'>

                {/* pages */}
                <div className='flex items-center justify-center flex-grow gap-4'>
                    <Link to={'/'} className='bg-primary px-[1rem] text-white rounded-5 py-[6px] hover:bg-primary_hover transition-colors w-[5rem] text-center'>
                        Home
                    </Link>
                    <Link to={'/posts'} className='bg-primary px-[1rem] text-white rounded-5 py-[6px] hover:bg-primary_hover transition-colors w-[5rem] text-center'>
                        Posts
                    </Link>
                    <Link to={'/ads'} className='bg-primary px-[1rem] text-white rounded-5 py-[6px] hover:bg-primary_hover transition-colors w-[5rem] text-center'>
                        Ads
                    </Link>
                </div>

                {/* profile */}
                {localStorage.hasOwnProperty('sm_user') ? (
                    <div className='flex items-center gap-4'>
                        <img
                            src={user.image}
                            alt='user'
                            className='w-[40px] h-[40px] object-cover rounded-full border-1 border-gray-500'
                        />
                        <Link
                            to={'/userProfile'}
                            className='bg-primary px-[1rem] text-white rounded-5 py-[6px] hover:bg-primary_hover transition-colors'>
                            Profile
                        </Link>

                        <Link
                            to={'/'}
                            className='bg-white text-black border-2 border-primary px-[0.7rem] rounded-5 py-[4px] hover:bg-primary_hover transition-colors hover:text-white'
                            onClick={removeUser}>
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div className='flex gap-4 items-center'>
                        <Link
                            className='bg-primary px-[1rem] text-white rounded-5 py-[6px] hover:bg-primary_hover transition-colors'
                            to={'/register'}>Register</Link>
                        <Link
                            className='bg-white text-black border-2 border-primary px-[1rem] rounded-5 py-[4px] hover:bg-primary_hover transition-colors hover:text-white'
                            to={'/login'}>Login</Link>
                    </div>
                )}

            </main>
            
            <MdOutlineMenu
                className='text-4xl cursor-pointer hidden max-[1024px]:block ml-auto  transition-all hover:cursor-pointer hover:text-primary'
                onClick={handleMenuClick}
            />
        </>
    )
}

export default DesktopNavbar