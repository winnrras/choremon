const { GoogleGenerativeAI } = require("@google/generative-ai");

const key = "AIzaSyDUdL12UT9e_t5B4XAIyvb7bQQPZrS_8Ns";
const genAI = new GoogleGenerativeAI(key);

async function test(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say 'hello' in JSON. Just output `{\"hello\": true}`");
    console.log(`[SUCCESS] ${modelName}:`, result.response.text());
  } catch (e) {
    console.error(`[ERROR] ${modelName}:`, e.message);
  }
}

async function run() {
  await test("gemma-3-12b-it");
  await test("models/gemma-3-12b-it");
  await test("google/gemma-3-12b-it");
  await test("gemini-1.5-flash");
}

run();
