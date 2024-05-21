import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Delete from '../../components/Blogs/deleteBlogs'
import blogs_db from '../../api/db/Blog';
import Loading from '../../components/WebinarComponents/utils/Loading';
import blog_bucket from '../../api/bucket/blogsBucket';

const FetchSingleBlogs = ({ImageFile, Title, Description}) => {
  const [InstruuctorData, setInstructor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch course data based on the courseId
  const fetchWebinarData = async () => {
    try {
        // Get the current URL path from window.location.pathname
        const urlPath = window.location.pathname;

        // Split the path into an array of segments using the '/' separator
        const pathSegments = urlPath.split('/');

        // The last segment is the last part of the array
        const id = pathSegments[pathSegments.length - 1];

        // Output the extracted ID
        console.log('Extracted ID:', id);
        const response = await blogs_db.fetchSingleBlog(
            id
        );
        console.log(response);
        setInstructor(response);
    } catch (error) {
        console.error('Failed to fetch course data:', error);
    } finally {
        setIsLoading(false);
    }
};

  const [Image, setImage] = useState(null);
  const [ImgLoad, setImgLoad] = useState(true);

  useEffect(() => {
    const getImage = async () => {
      try {
        const Image = await blog_bucket.GetImage(InstruuctorData.Image);
        console.log(Image)
        setImage(Image);
        setImgLoad(false);
      } catch (error) {
        console.log(error.message);
        setImgLoad(true);
      }
    }

    getImage();
  }, [InstruuctorData]);

// Use effect to fetch course data when component mounts
useEffect(() => {
    fetchWebinarData();
    console.log(InstruuctorData);
}, []);

  return (
    <section className='flex w-full min-h-screen justify-center items-center bg-dark-2'>
      <React.Fragment>
        {(isLoading === false && InstruuctorData !== null) ? (
          <>
            <div className='w-[300px] sm:w-[350px] min-h-[300px] bg-dark-1 rounded-md shadow-dark-4 shadow hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-dark-4 transition-all duration-300 ease-in-out my-[4rem]'>
              <React.Fragment>
                {(ImgLoad === false && Image !== null) ? (
                  <>
                  <img src={Image} alt='place' className='w-full h-[50%]' />
                  </>
                ): (
                  <>
                    <Loading />
                  </>
                )}
              </React.Fragment>
              
              <section className='px-[1.2rem] py-[1.4rem]'>
                  <h2 className='text-2xl font-bold pb-[1rem] text-dark-2'>
                    {InstruuctorData.Title}
                  </h2>
                  <h4 className='text-sm font-normal text-dark-2'>
                    {InstruuctorData.Description}
                  </h4>
              </section>

              <section className='w-full py-[0.7rem] px-[1.3rem] justify-between items-center flex'>
                <button className=' bg-dark-4 px-6 py-2 text-dark-1 font-semibold rounded-md hover:shadow-md hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
                  <Link to={`/admin/blogs/update-blogs/${InstruuctorData.$id}`}>
                    Update
                  </Link>
                </button>

                <Delete fileId={InstruuctorData.$id}  />
              </section>
          </div>
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </React.Fragment>
    </section>
  )
}

export default FetchSingleBlogs