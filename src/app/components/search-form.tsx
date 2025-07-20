import { FormEventHandler } from "react";
import { IconSearch } from "../../../public/iconSearch";

export const SearchForm = ({
  handleSubmit,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  return (
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
  );
};
