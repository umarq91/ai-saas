import {action} from "./_generated/server";
import {v} from "convex/values"
import OpenAi from "openai"
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
})

export const generateAudioAction = action({
    args: {input: v.string(),voice: v.string()},
    handler: async (ctx, args) => {
        // call openAi Api to create a new Spech

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: args.voice as SpeechCreateParams["voice"], // this wll let know that voice is one of the types that openai supports
            input: args.input,
          });
          const buffer =await mp3.arrayBuffer();

        return buffer
    }
})