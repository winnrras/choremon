async function main() {
  const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/vBKc2FfBKJfcZNyEt1n6/stream', {
    method: 'POST',
    headers: {
      'xi-api-key': '2ae94454ac22313cfd317f6ce49043d8cd51e4a7252d52496c4736877111a639',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'Hello world',
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.35, similarity_boost: 0.75, style: 0.6, use_speaker_boost: true }
    })
  });
  console.log(res.status);
  const data = await res.json();
  console.log(data?.detail?.status || data?.detail?.message);
}
main();
