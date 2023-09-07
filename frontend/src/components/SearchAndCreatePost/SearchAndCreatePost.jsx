import React from 'react'

function SearchAndCreatePost() {
    return (
        <main className='w-[30%] flex flex-col gap-10 max-[1280px]:w-[45%] order-last max-[768px]:order-first max-[1024px]:w-full'>

            <section className='bg-white border-1 border-blue-300 rounded-5 drop-shadow-lg flex flex-col gap-5 py-4 px-6'>
                <p className='text-xl text-center'>Create Post</p>
                <input className='border-1 border-slate-300 py-2 px-7 rounded-5' type="text" placeholder='Title' />
                <input className='border-1 border-slate-300 py-2 px-7 rounded-5' type="text" placeholder='Message' />
                <p className='text-slate-400 text-sm'>Tags</p>
                <input placeholder='Choose file' className='border-1 border-slate-300 py-2 px-7 rounded-5' type='file' name='image' />
                <button className='bg-primary text-white py-2 rounded-5 hover:bg-primary_hover transition-colors' type='submit'>Submit</button>
                <button className='bg-red-600 text-white py-2 rounded-5 transition-colors hover:bg-red-500' type='submit'>Clear</button>
            </section>

            <section className='bg-white border-1 border-blue-300 rounded-5 drop-shadow-lg flex flex-col gap-5 py-4 px-6'>
                <p className='text-xl text-center'>Search Posts</p>
                <input className='border-1 border-slate-300 py-2 px-7 rounded-5' type="text" placeholder='Post name' />
                <button className='bg-primary text-white py-2 rounded-5 hover:bg-primary_hover transition-colors' type='submit'>Search</button>
            </section>

        </main>
    )
}

export default SearchAndCreatePost
