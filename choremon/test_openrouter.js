const fs = require('fs');
const key = "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";
const dummyImg = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

async function run() {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemma-3-12b-it:free",
      messages: [ { role: "user", content: [ { type: "text", text: "what" }, { type: "image_url", image_url: { url: `data:image/png;base64,${dummyImg}` } } ] } ]
    })
  });
  const data = await res.json();
  fs.writeFileSync("output.json", JSON.stringify(data, null, 2));
}

run();
