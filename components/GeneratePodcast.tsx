import React, { useState } from 'react'
import { GeneratePodcastProps } from '@/types'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import {useUploadFiles} from "@xixixao/uploadstuff/react"
import { generateUploadUrl } from '@/convex/files'

// custom hook for podcast generation
const useGeneratePodcast = ({
  setAudio, voiceType, voicePrompt, setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  // const { toast } = useToast()

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl)

  const getPodcastAudio = useAction(api.openAi.generateAudioAction)

  const getAudioUrl = useMutation(api.podcasts.generateUploadUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio('');

    console.log(voicePrompt);
    
    // if(!voicePrompt) {
    //   toast({
    //     title: "Please provide a voiceType to generate a podcast",
    //   })
    //   return setIsGenerating(false);
    // }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })

      const blob = new Blob([response], { type: 'audio/mpeg' });
      const fileName = `podcast-${new Date().getTime()}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl();
      setAudio(audioUrl!);
      setIsGenerating(false);
      // toast({
      //   title: "Podcast generated successfully",
      // })
    } catch (error) {
      console.log('Error generating podcast', error)
      // toast({
      //   title: "Error creating a podcast",
      //   variant: 'destructive',
      // })
      setIsGenerating(false);
    }
    
  }

  return { isGenerating, generatePodcast }
}

import { Loader } from 'lucide-react'
import { generateAudioAction } from '@/convex/openAi'
import { useAction, useMutation } from 'convex/react'
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
      <Button
      onClick={generatePodcast}
      type="submit" className="text-16  bg-orange-1 py-4 font-extrabold text-white-1 ">
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