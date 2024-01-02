import { useState } from "react";
import Transcribing from "./Transcribing";
import Translation from "./Translation";
import Transcription from "./Transcription";

const Information = () => {
  const [tab, setTab] = useState("transcription");
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-blue-400 text-bold">Transcription</span>
      </h1>

      <div className="grid grid-cols-2 mx-auto shadow rounded-full overflow-hidden items-center bg-white">
        <button
          className={
            "px-4 py-1 font-medium duration-200 " +
            (tab === "transcription"
              ? "bg-blue-400"
              : "text-blue-400 hover:text-blue-600")
          }
          onClick={() => setTab("transcription")}
        >
          Transcription
        </button>
        <button
          className={
            "px-4 py-1 font-medium duration-200 " +
            (tab === "translation"
              ? "bg-blue-400"
              : "text-blue-400 hover:text-blue-600")
          }
          onClick={() => setTab("translation")}
        >
          Translation
        </button>
      </div>

      {tab === "transcription" ? <Transcription /> : <Translation />}
    </main>
  );
};

export default Information;
