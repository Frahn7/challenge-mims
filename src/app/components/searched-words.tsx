type SearchedWord = {
  word: string;
  date: string;
};

export const SearchedWords = ({
  searchedWords,
}: {
  searchedWords: SearchedWord[];
}) => {
  return (
    <div className="md:left-4 md:top-1/2  md:-translate-y-1/2  md:fixed">
      <h3 className="font-bold text-2xl">Searched Words</h3>
      <div className=" flex flex-col-reverse">
        {searchedWords.map((word, i) => (
          <p key={i}>
            <span className="font-bold">{word.word}</span> {word.date}
          </p>
        ))}
      </div>
    </div>
  );
};
