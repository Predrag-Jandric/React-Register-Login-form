import React from 'react'
import { Link } from 'react-router-dom'
import error from '../../assets/error-page.jpg'

function ErrorPage() {
    return (
        <main className='bg-page_bg h-screen flex flex-col items-center gap-7 pt-14'>
            <img className='w-[90%] sm:w-[25rem] rounded-lg' src={error} alt="error representation" />
            <h1 className='px-4 text-3xl font-semibold text-primary text-center'>Oops! Page not found</h1>
            <p className='w-[90%] text-center sm:w-[40rem] px-4'>Seems like you've taken a wrong turn and ended up in the mysterious ocean depths. The page you were trying to navigate seems to be lost among the ruins of a forgotten civilization.</p>
            <Link className='bg-primary text-white py-2 px-10 rounded-5 hover:bg-primary_hover transition-colors' to="/">Back to Home Page</Link>
        </main>
    )
}

export default ErrorPage
