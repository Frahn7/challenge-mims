import { Play, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

interface Phonetics {
  audio: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

interface Definition {
  definition: string;
  example?: string;
}

interface WordProps {
  meanings: Meaning[];
  phonetics: Phonetics[];
  phonetic: string;
  word: string;
  sourceUrls: string[];
}

export const Word = ({ word }: { word: WordProps }) => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const handlePlay = (index: number) => {
    audioRefs.current[index]?.play();
  };

  return (
    <div className="flex justify-start md:w-[40%] w-[80%] flex-col">
      <div className="flex flex-row justify-between">
        <p className="text-[45px] font-bold">{word?.word}</p>
        <div>
          {word?.phonetics.map(
            (phonetic, k) =>
              phonetic.audio.length > 0 && (
                <div key={k}>
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[k] = el;
                    }}
                    src={phonetic.audio}
                  />
                  <button onClick={() => handlePlay(k)}>
                    <Play className="bg-[#e9d0fa] text-[#a843f2] w-15 h-15 rounded-full p-4 cursor-pointer" />
                  </button>
                </div>
              )
          )}
        </div>
      </div>
      <span className="text-[25px] text-[#a344ec]">{word?.phonetic}</span>

      {word?.meanings.map((meaning, k) => (
        <div key={k} className="mt-8">
          <div className="flex flex-row gap-4">
            <span className="text-[20px] font-semibold flex flex-row items-center gap-4">
              {meaning.partOfSpeech}
              <hr className="border-t border-gray-300 md:w-[65vh] w-[10vh]" />
            </span>
            <hr />
          </div>

          <div className="py-7">
            <h3 className="text-gray-500 -mt-4 mb-4">Meanings</h3>
            <ul className="list-disc flex flex-col gap-4">
              {meaning.definitions.map((content, j) => (
                <li key={j}>
                  <p>{content.definition}</p>
                  {content.example && (
                    <p className="text-gray-500">
                      &quot;{content.example}&quot;
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {meaning.synonyms.length > 0 && (
            <div>
              Synonyms{" "}
              <span className="text-[#a344ec] text-xl font-bold px-3">
                {meaning.synonyms.join(" ")}
              </span>{" "}
            </div>
          )}
        </div>
      ))}

      {(word?.sourceUrls?.length ?? 0) > 0 && (
        <div className="flex flex-row gap-2">
          <span className="text-gray-500">Source</span>
          <ul>
            {word?.sourceUrls?.map((url, k) => (
              <Link
                key={k}
                href={url}
                target="_blank"
                className="underline flex flex-row gap-2"
              >
                {url} <SquareArrowOutUpRight width={13} color="gray" />
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
