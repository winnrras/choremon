async function main() {
  const apiKey = '2ae94454ac22313cfd317f6ce49043d8cd51e4a7252d52496c4736877111a639';
  const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
    headers: { 'xi-api-key': apiKey }
  });
  console.log('Status:', res.status);
  console.log(await res.json());
}
main();
