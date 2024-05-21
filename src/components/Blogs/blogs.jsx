import React, { useEffect, useState } from 'react'
import PlaceHolder from '../../assets/images/joker.webp';
import { Link } from 'react-router-dom';
import InstructorService from '../../api/bucket/InstructorBucket';
import Loading from '../WebinarComponents/utils/Loading';
import blog_bucket from '../../api/bucket/blogsBucket';

const CardBlog = ({blog}) => {

  const [Image, setImage] = useState(null);
  const [ImgLoad, setImgLoad] = useState(true);

  useEffect(() => {
    console.log(blog);
    const getImage = async () => {
      try {
        console.log(blog);
        const Image = blog.Image;
        console.log(Image)
        setImage(Image);
        setImgLoad(false);
      } catch (error) {
        console.log(error.message);
        setImgLoad(true);
      }
    }

    getImage();
  }, [blog]);


  return (
    <section className='w-full h-full flex flex-wrap justify-center items-center gap-x-[2.2rem] gap-y-[3rem] px-[2rem] my-[2rem]'>
    <div className='w-[300px] sm:w-[350px] min-h-[300px] bg-dark-1 rounded-md shadow-dark-4 shadow hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-dark-4 transition-all duration-300 ease-in-out'>
        <React.Fragment>
          {(ImgLoad === false && Image !== null) ? (
            <>
              <img src={Image ? Image : PlaceHolder} alt='place' className='w-full h-[50%]' />
            </>
          ) : (
            <>
              <main className='w-full h-[50%]'>
                <Loading />
              </main>
            </>
          )}
        </React.Fragment>
        
        <section className='px-[1.2rem] py-[1.4rem]'>
            <h2 className='text-2xl font-bold pb-[1rem] text-dark-2'>
            {blog.Title}
            </h2>
            <h4 className='text-sm font-normal text-dark-2'>
            {blog.Description}
            </h4>

            <button className='ms-[1rem] mt-[1rem] px-6 py-2 rounded-md shadow-md shadow-dark-4 hover:bg-dark-5 text-dark-1 hover:shadow-sm hover:font-bold bg-dark-2 hover:translate-x-2 hover:scale-105 transition-all duration-200 ease-in-out'>
                <Link to={`/admin/blogs/fetch-single-blog/${blog.$id}`}>
                    View
                </Link>
            </button>
        </section>

    </div>
    </section>
  )
}

export default CardBlog