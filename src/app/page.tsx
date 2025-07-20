"use client";

import { FormEventHandler, useState } from "react";
import { IconBook } from "../../public/iconBook";
import { FontSelect } from "./components/font-select";
import { Toggle } from "./components/toggle";
import { Word } from "./components/word";
import { toast } from "sonner";
import { SearchedWords } from "./components/searched-words";
import { SearchForm } from "./components/search-form";

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

interface WordsProps {
  meanings: Meaning[];
  phonetics: [];
  phonetic: string;
  word: string;
  sourceUrls: string[];
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
    <div className="flex flex-col py-5 max-w-screen min-h-screen items-center gap-8">
      {searchedWords.length > 0 && (
        <SearchedWords searchedWords={searchedWords} />
      )}
      <div className="md:w-[40%] w-[80%] flex flex-row justify-between">
        <IconBook />
        <div className="flex flex-row justify-center items-center gap-6">
          <FontSelect />
          |
          <Toggle />
        </div>
      </div>

      <SearchForm handleSubmit={handleSubmit} />

      {words && <Word word={words} />}
    </div>
  );
}
