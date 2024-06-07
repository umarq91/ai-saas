import React from 'react'

function PodcastDetails({params}: {params: {id: string}}) {
  return (
    <div className='text-white-1'>PodcastDetails   for {params.id}</div>
  )
}

export default PodcastDetails