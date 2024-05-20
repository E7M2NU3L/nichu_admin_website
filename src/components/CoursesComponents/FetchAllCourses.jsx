import React, { useEffect, useState } from 'react'
import CourseCard from './utils/CourseCard'
import courseDB from '../../api/db/CoursesDb'
import Loading from '../WebinarComponents/utils/Loading';

const FetchAllCourses = () => {

  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const promise = await courseDB.ListAllCourses();
        if (promise.documents) {
          console.log(promise);
          const courseData = promise.documents;
          setCourseData(courseData);
          setLoading(false);
        }
        else {
          setLoading(true);
          return false;
        }
      } catch (error) {
        console.error("Error Occured: "+ error.message);
        return false;
      }
    }

    fetchData();
  }, []);
  
  return (
    <div>
       <section className='w-full flex flex-row justify-around items-center flex-wrap px-[1rem] gap-y-[1rem]'>
      <React.Fragment>
        {(loading === false && courseData !== null) ? (
          <>
          {courseData.map((course) => (
            <React.Fragment>
              <CourseCard course={course} />
            </React.Fragment>
          ))}
            
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </React.Fragment>
      </section>
    </div>
  )
}

export default FetchAllCourses