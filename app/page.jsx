"use client";
import FileDisplay from "@/components/FileDisplay";

import HomePage from "@/components/HomePage";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const isAudioAvailable = file || audioStream;
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker("/worklet/whisper-worker.js");

    // Listen for messages from the worker
    const messageHandler = (event) => {
      console.log("Message received from the worker:", event.data);
    };
    workerRef.current.addEventListener("message", messageHandler);

    return () => {
      workerRef.current.terminate();
      workerRef.current.removeEventListener("message", messageHandler);
    };
  }, []);

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) {
      return;
    }

    const audio = await readAudioFrom(file ? file : audioStream);
    workerRef.current.postMessage({ audio });
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        {isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
            handleFormSubmission={handleFormSubmission}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer></footer>
    </div>
  );
}
