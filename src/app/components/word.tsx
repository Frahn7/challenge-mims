import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface WordProps {
  meanings: Meaning[];
  phonetics: [];
  phonetic: string;
  word: string;
  sourceUrls: string[];
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

export const Word = ({ word }: { word: WordProps }) => {
  return (
    <div className="flex justify-start w-[40%] flex-col">
      <p className="text-[45px] font-bold">{word?.word}</p>
      <span className="text-[25px] text-[#a344ec]">{word?.phonetic}</span>

      {word?.meanings.map((meaning, k) => (
        <div key={k}>
          <div className="flex flex-row gap-4">
            <span className="text-[20px]   font-semibold">
              {meaning.partOfSpeech}
            </span>
            <hr />
          </div>

          <div className="py-7">
            <h3 className="text-gray-500">Meanings</h3>
            <ul className="list-disc">
              {meaning.definitions.map((content, j) => (
                <li key={j}>
                  <p>{content.definition}</p>
                  {content.example && <p>&quot;{content.example}&quot;</p>}
                </li>
              ))}
            </ul>
          </div>

          {meaning.synonyms.length > 0 && (
            <div>Synonyms {meaning.synonyms.join(" ")} </div>
          )}
        </div>
      ))}

      {(word?.sourceUrls?.length ?? 0) > 0 && (
        <div className="flex flex-row gap-2">
          Source{" "}
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
