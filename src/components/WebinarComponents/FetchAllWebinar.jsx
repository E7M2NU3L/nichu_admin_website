import React from 'react'
import WebinarCard from './utils/WebinarCard'

const FetchAllWebinar = () => {
  return (
    <section className='w-full py-[2rem] flex flex-row justify-around items-center flex-wrap px-[1rem] gap-y-[1rem]'>
        <WebinarCard />
        <WebinarCard />
        <WebinarCard />
        <WebinarCard />
        <WebinarCard />
      </section>
  )
}

export default FetchAllWebinar