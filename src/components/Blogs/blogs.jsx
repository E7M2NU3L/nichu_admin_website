import React from 'react'
import PlaceHolder from '../../assets/images/joker.webp';
import { Link } from 'react-router-dom';

const CardBlog = () => {
  return (
    <div className='w-[300px] sm:w-[350px] min-h-[300px] bg-dark-1 rounded-md shadow-dark-4 shadow hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-dark-4 transition-all duration-300 ease-in-out'>
        <img src={PlaceHolder} alt='place' className='w-full h-[50%]' />
        
        <section className='px-[1.2rem] py-[1.4rem]'>
            <h2 className='text-2xl font-bold pb-[1rem] text-dark-2'>
            Arthur Fleck: The Tragic Transformation of Gotham's Clown Prince
            </h2>
            <h4 className='text-sm font-normal text-dark-2'>
            Arthur Fleck, a downtrodden and troubled man living in the gritty streets of Gotham City, grapples with societal rejection and personal demons. As an aspiring stand-up comedian,
            </h4>

            <button className='ms-[1rem] mt-[1rem] px-6 py-2 rounded-md shadow-md shadow-dark-4 hover:bg-dark-5 text-dark-1 hover:shadow-sm hover:font-bold bg-dark-2 hover:translate-x-2 hover:scale-105 transition-all duration-200 ease-in-out'>
                <Link to="/admin/blogs/fetch-single-blog/1234">
                    View
                </Link>
            </button>
        </section>

    </div>
  )
}

export default CardBlog