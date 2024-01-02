"use client";
import { useState, useRef, useEffect } from "react";

const HomePage = ({ setFile, setAudioStream }) => {
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus("recording");

    //create new Media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") return;

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [recordingStatus]);

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Web<span className="text-blue-400 text-bold">ML</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button
        className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 px-4 py-2 rounded-xl shadow-lg bg-white"
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
      >
        <p className="text-blue-400">
          {recordingStatus === "inactive" ? "Record" : "Stop recording"}
        </p>
        <div className="flex items-center gap-2">
          {duration !== 0 && <p className="text-sm">{duration}s</p>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 duration-200 ${
              recordingStatus === "recording" ? " text-rose-300" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          upload{" "}
          <input
            className="hidden"
            type="file"
            accept=".mp3, .wav"
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-400">Free now free forever</p>
    </main>
  );
};

export default HomePage;
