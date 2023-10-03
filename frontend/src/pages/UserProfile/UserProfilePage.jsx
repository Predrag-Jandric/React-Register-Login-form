import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment/moment';

function UserProfilePage() {

    const user = useSelector((state) => state.userStore.user)

    const formatDate = (dateString) => {
        return moment(dateString).format('DD-MM-YYYY');
      };

    return (
        <main className='w-[90%] mx-auto my-10 flex flex-col sm:w-[30rem] items-center gap-8 bg-white py-6 border-1 border-blue-300 rounded-5 drop-shadow-lg'>

            <img className='rounded-full w-[12rem] h-[12rem] border-1 border-primary drop-shadow-lg object-cover mt-3' src={user.image} alt="User Avatar" />

            <div className='flex flex-col gap-2 w-[90%] p-2'>

                <p className='flex justify-between ml-3'>First Name:
                    <span className='text-primary mr-3'>{user.firstName}</span>
                </p>
                <hr />
                <p className='flex justify-between ml-3 mt-3'>Last Name:
                    <span className='text-primary mr-3'>{user.lastName}</span>
                </p>
                <hr />
                <p className='flex justify-between ml-3 mt-3'>Email:
                    <span className='text-primary mr-3'>{user.email}</span>
                </p>
                <hr />
                <p className='flex justify-between ml-3 mt-3'>Gender:
                    <span className='text-primary mr-3'>{user.gender}</span>
                </p>
                <hr />
                <p className='flex justify-between ml-3 mt-3'>Birth Date:
                    <span className='text-primary mr-3'>{formatDate(user.birthDate)}</span>
                </p>
                <hr />

                <button className='bg-primary text-white py-2 rounded-5 mt-5 w-32 mx-auto hover:bg-primary_hover transition-colors'>Edit Profile</button>
            </div>

        </main>
    )
}

export default UserProfilePage
