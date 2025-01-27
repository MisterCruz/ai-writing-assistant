import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const Home = () => {
  const [userInput, setUserInput] = useState("");

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI");
    const res = await fetch(`/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
    });
    const data = await res.json();
    const { output } = data;
    console.log(`openAI replied... ${output.text}`);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>AI Writing Assistant</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate a blog post/story about any topic 🪄</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Write a prompt you want a blog post about (ex: Top 5 Cities in
              Skyrim, How Sheldon Cooper makes matcha, a good morning routine,
              etc)
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          ></textarea>
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
        <div className="header">
          <div className="header-subtitle">
            <h1>
              Made with ❤️ by{" "}
              <a
                href="https://github.com/MisterCruz"
                style={{ color: "inherit" }}
              >
                Rolando
              </a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
