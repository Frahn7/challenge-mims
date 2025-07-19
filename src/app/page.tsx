"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { IconBook } from "../../public/iconBook";
import { IconSearch } from "../../public/iconSearch";
import { FontSelect } from "./components/font-select";
import { Toggle } from "./components/toggle";
import { Word } from "./components/word";
import { toast } from "sonner";

interface WordsProps {
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

type SearchedWord = {
  word: string;
  date: string;
};

export default function Home() {
  const [words, setWords] = useState<WordsProps>();
  const [searchedWords, setSearchedWords] = useState<SearchedWord[]>([]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement & {
      word: { value: string };
    };
    if (form.word.value.length > 0) {
      fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${form.word.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setWords(data[0]);
            if (searchedWords.length > 4) {
              searchedWords.shift();

              const newWord = data[0].word;
              const nowFormatted = new Date().toLocaleString();

              setSearchedWords([
                ...searchedWords,
                { word: newWord, date: nowFormatted },
              ]);
            } else
              setSearchedWords([
                ...searchedWords,
                { word: data[0].word, date: new Date().toLocaleString() },
              ]);

            localStorage.setItem("Searched", data[0].word);
          } else if (data.title) {
            toast.error(data.title);
          }
        })
        .catch(() => {
          toast.error("Network error or invalid response");
        });
    } else {
      toast.error("You must enter a word!");
    }
  };

  return (
    <div className="flex mt-5 mb-5 flex-col justify-center max-w-screen min-h-screen items-center gap-11">
      <div className="md:w-[40%] w-[80%] flex flex-row justify-between">
        <IconBook />
        <div className="flex flex-row justify-center items-center gap-6">
          <FontSelect />
          |
          <Toggle />
        </div>
      </div>
      {searchedWords.length > 0 && (
        <div className="left-4 top-1/2 -translate-y-1/2 fixed hidden md:block">
          <h3 className="font-bold text-2xl">Searched Words</h3>
          <div className=" flex flex-col-reverse">
            {searchedWords.map((word, i) => (
              <p key={i}>
                <span className="font-bold">{word.word}</span> {word.date}
              </p>
            ))}
          </div>
        </div>
      )}
      <form
        className="flex justify-center relative w-screen md:w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="word"
          className="bg-background border md:w-[40%] w-[80%] p-4 font-bold rounded-xl "
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute md:right-[31%] right-[15%] top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <IconSearch />
        </button>
      </form>

      {words && <Word word={words} />}
    </div>
  );
}
