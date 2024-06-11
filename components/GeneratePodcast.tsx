import React, { useState } from 'react'
import { GeneratePodcastProps } from '@/types'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

// custom hook for podcast generation
const useGeneratePodcast = ({
  setAudio,voiceType,voicePrompt,setAudioStorageId
}:GeneratePodcastProps)=>{
// Logic for Podcast generation 

  const [isGenerating, setIsGenerating] = useState(false)

  const getPodcastAudio = useAction(api.openAi.generateAudioAction) // this does nothing just extracting an action(async function called in convex)

  const generatePodcast=async()=>{
    setIsGenerating(true)
    setAudio('')
  
  if(!voicePrompt){
    // todo : show error toast
    return setIsGenerating(false)
  }


try {
  const response = await getPodcastAudio({
    voice: voiceType,
  input: voicePrompt
})
// when working with mp3 we need to convert it to blob
const blob = new Blob([response], { type: 'audio/mpeg' })
const filename = `podcast-${new Date().getTime()}.mp3`
const file = new File([blob], filename, { type: 'audio/mpeg' }) 
} catch (error) {
  // todo : show error toast
setIsGenerating(false)
console.log("Error generating Podcast",error);

}

return {isGenerating,generatePodcast}
}
return "success"
}

import { Loader } from 'lucide-react'
import { generateAudioAction } from '@/convex/openAi'
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
const GeneratePodcast = (props:GeneratePodcastProps) => {

const {isGenerating,generatePodcast} = useGeneratePodcast(props)



  return (
    <div>
      <div className='flex flex-col gap-2.5'>
          <Label className='text-16 font-bold text-white-1'>
            Prompt To AI voice
          </Label>
          <Textarea 
          className='input-class font-light focus-visible:ring-offset-orange-1'
          placeholder='What do you want me to say?'
          rows={5}
        value={props.voicePrompt}
        onChange={(e) => props.setVoicePrompt(e.target.value)}
/>
      </div>

      <div className='mt-5 w-full max-w-[200px]'>
      <Button type="submit" className="text-16  bg-orange-1 py-4 font-extrabold text-white-1 ">
                  {isGenerating ? (
                    <>
                      Generating
                      <Loader size={20} className="animate-spin ml-2" />
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
      </div>
      {props.audio && (
        <audio
        src={props.audio}
        autoPlay
        controls
        className='mt-5'
        onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast