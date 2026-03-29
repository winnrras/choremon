import { ElevenLabsClient } from "elevenlabs";

const ELEVENLABS_API_KEY = "2ae94454ac22313cfd317f6ce49043d8cd51e4a7252d52496c4736877111a639";
const ELEVENLABS_VOICE_ID = "vBKc2FfBKJfcZNyEt1n6";

const client = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });

async function main() {
  try {
    const audioStream = await client.textToSpeech.convert(ELEVENLABS_VOICE_ID, {
      text: "Hello world",
      model_id: "eleven_v3",
      voice_settings: {
        stability: 0.35,
        similarity_boost: 0.75,
        style: 0.6,
        use_speaker_boost: true,
      },
    });

    const chunks = [];
    for await (const chunk of audioStream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    console.log("Success! Buffer size:", buffer.length);
  } catch (err) {
    console.error("Error occurred:", err.statusCode);
    if (err.body) {
      if (typeof err.body.getReader === 'function') {
         // read stream
      } else {
         console.error(err.body);
      }
    }
    console.error(err);
  }
}

main();
