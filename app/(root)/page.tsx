import PodcastCard from '@/components/PodcastCard'
import React from 'react'
import { podcastData } from "@/constants"

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className='flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

        <div className="podcast_grid">
          {podcastData?.map(({ id,title,description,imgURL }) => (
            <PodcastCard
              key={id}
              imgUrl={imgURL as string}
              title={title}
              description={description}
              podcastId={id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home