import React, { useState } from 'react'
import { GeneratePodcastProps } from '@/types'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
const GeneratePodcast = ({
  setudioStorageId,
  setAudio,
  audio,
  voiceType,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration
}:GeneratePodcastProps) => {

  const [isGenerating, setIsGenerating] = useState(false)
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
        value={voicePrompt}
        onChange={(e) => setVoicePrompt(e.target.value)}
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
      {audio && (
        <audio
        src={audio}
        autoPlay
        controls
        className='mt-5'
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast