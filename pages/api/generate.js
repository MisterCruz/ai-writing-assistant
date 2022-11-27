import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write me a Twitter thread in the style of Paul Graham. Please make sure the twitter thread goes in-depth on the topic and shows the writer did their research.
Thread:
`;
const generateAction = async (req, res) => {
  //run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;