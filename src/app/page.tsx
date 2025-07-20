"use client";

import { FormEventHandler, useState } from "react";
import { IconBook } from "../../public/iconBook";
import { FontSelect } from "./components/font-select";
import { Toggle } from "./components/toggle";
import { Word } from "./components/word";
import { toast } from "sonner";
import { SearchedWords } from "./components/searched-words";
import { SearchForm } from "./components/search-form";
import { useLazyGetEntryByWordQuery } from "@/services/dictionary-api";

type SearchedWord = {
  word: string;
  date: string;
};

export default function Home() {
  const [searchedWords, setSearchedWords] = useState<SearchedWord[]>([]);
  const [trigger, { data }] = useLazyGetEntryByWordQuery();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement & {
      word: { value: string };
    };

    if (form.word.value.length > 0) {
      trigger(form.word.value)
        .unwrap()
        .then((data) => {
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
        })
        .catch((err) => {
          if (err.data.title) {
            toast.error(err.data.title);
          } else {
            toast.error("Error");
          }
        });
    } else {
      toast.error("You must enter a word!");
    }
  };

  return (
    <div className="flex flex-col py-5 max-w-screen min-h-screen items-center gap-8">
      <div className="md:w-[40%] w-[80%] flex flex-row justify-between">
        <IconBook />
        <div className="flex flex-row justify-center items-center gap-6">
          <FontSelect />
          |
          <Toggle />
        </div>
      </div>

      <SearchForm handleSubmit={handleSubmit} />
      {searchedWords.length > 0 && (
        <SearchedWords searchedWords={searchedWords} />
      )}

      {Array.isArray(data) && <Word word={data[0]} />}
    </div>
  );
}
