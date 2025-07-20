import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const dictionaryApi = createApi({
  reducerPath: "dictionaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  }),
  endpoints: (builder) => ({
    getEntryByWord: builder.query<WordsProps[], string>({
      query: (word) => `${word}`,
    }),
  }),
});
export const { useLazyGetEntryByWordQuery } = dictionaryApi;
