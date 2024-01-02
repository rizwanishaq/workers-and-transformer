import React, { useRef, useEffect } from "react";
const FileDisplay = ({
  file,
  audioStream,
  handleAudioReset,
  handleFormSubmission,
}) => {
  const audioRef = useRef();

  useEffect(() => {
    if (!file && !audioStream) {
      return;
    }
    if (file) {
      audioRef.current.src = URL.createObjectURL(file);
    } else {
      audioRef.current.src = URL.createObjectURL(audioStream);
    }
  }, [audioStream, file]);
  return (
    <main className="flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-full max-w-prose mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-blue-400 bold">File</span>
      </h1>
      <div className=" flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p className="truncate">{file ? file?.name : "Custom audio"}</p>
      </div>
      <div className="flex flex-col mb-2">
        <audio ref={audioRef} className="w-full" controls>
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleAudioReset}
          className="text-slate-400 hover:text-blue-600 duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn  px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium "
        >
          <p>Transcribe</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
