"use client";
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

import { FormEventHandler, useState } from "react";
import { IconBook } from "../../public/iconBook";
import { IconSearch } from "../../public/iconSearch";
import { FontSelect } from "./components/font-select";
import { Toggle } from "./components/toggle";
import { Word } from "./components/word";
import { toast } from "sonner";

export default function Home() {
  const [words, setWords] = useState<WordsProps>();

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
        .then((data) => setWords(data[0]));
    } else toast.error("You must enter a word!");
  };

  return (
    <div className="flex mt-2 flex-col justify-center max-w-screen min-h-screen items-center gap-11">
      <div className="w-[40%] flex flex-row justify-between">
        <IconBook />
        <div className="flex flex-row justify-center items-center gap-6">
          <FontSelect />
          |
          <Toggle />
        </div>
      </div>
      <form
        className="w-full flex justify-center relative"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="word"
          className="bg-background border w-[40%] p-4 font-bold rounded-xl "
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute right-[31%] top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <IconSearch />
        </button>
      </form>
      {words && <Word word={words} />}
    </div>
  );
}
