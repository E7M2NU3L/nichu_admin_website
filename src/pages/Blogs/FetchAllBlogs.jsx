import React, { useEffect, useState } from 'react'
import PlaceHolder from '../../assets/images/images (5).png'
import CardBlog from '../../components/Blogs/blogs'
import { Link } from 'react-router-dom'
import blogs_db from '../../api/db/Blog'
import Loading from '../../components/WebinarComponents/utils/Loading'

const FetchAllBlogs = () => {

  const [blogs, setblogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async() => {
      try {
        const res = await blogs_db.FetchAllBlogs();
        console.log(res);
        setblogs(res.documents);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(true);
      }
    }

    fetchCourseData();
  }, []);

  return (
    <div className='min-h-[90vh] bg-dark-2 pb-[3rem]'>

      <section className=' relative py-[1rem] flex w-full justify-center items-center gap-x-[1.7rem] sm:gap-x-[5rem]'>
        <h1 className='text-4xl sm:text-5xl text-dark-1 underline font-semibold'>
          Blogs
        </h1>
        <img  src={PlaceHolder} alt='blog-logo' className='w-[200px] h-[250px] sm:w-[350px] sm:h-[420px]' />

        <button className='absolute bottom-[5%] sm:bottom-[20%] right-[10%] bg-dark-4 px-6 py-2 text-dark-1 font-semibold rounded-md hover:shadow-md hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
          <Link to="/admin/blogs/create-blogs">
          Create Blog
          </Link>
        </button>
      </section>

      {(loading === false && blogs !== null) ? (
        <React.Fragment>
          {blogs.map((blog, index) => (
            <>
                <CardBlog blog={blog} key={index} />
            </>
          ))}
        </React.Fragment>    
      ) : (
        <React.Fragment>
        <section className='w-full h-full flex flex-wrap justify-center items-center gap-x-[2.2rem] gap-y-[3rem] px-[2rem]'>
          <Loading />
        </section>
      </React.Fragment>
      )}
    </div>
  )
}

export default FetchAllBlogs