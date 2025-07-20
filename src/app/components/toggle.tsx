"use client";

import { useTheme } from "next-themes";

const Moon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      height="28px"
      width="28px"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 49.739 49.739"
      xmlSpace="preserve"
      className="dark:hidden block"
    >
      <path d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l-0.615,2.268  c-1.479,5.459-0.899,11.25,1.633,16.306c2.75,5.493,7.476,9.587,13.305,11.526c5.831,1.939,12.065,1.492,17.559-1.258v0  c0.25-0.125,0.492-0.258,0.734-0.391l2.061-1.13l-0.585,2.252c-1.863,6.873-6.577,12.639-12.933,15.822  C32.639,48.039,28.825,48.888,25.068,48.889z M12.002,4.936c-9.413,6.428-12.756,18.837-7.54,29.253  c5.678,11.34,19.522,15.945,30.864,10.268c5.154-2.582,9.136-7.012,11.181-12.357c-5.632,2.427-11.882,2.702-17.752,0.748  c-6.337-2.108-11.473-6.557-14.463-12.528C11.899,15.541,11.11,10.16,12.002,4.936z" />
    </svg>
  );
};

const Sun = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      fill="#ffff"
      className="dark:block hidden"
    >
      <path d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" />
      <path d="M12.75 3V5.25H11.25V3H12.75Z" />
      <path d="M21 12.75L18.75 12.75L18.75 11.25L21 11.25L21 12.75Z" />
      <path d="M18.8943 6.16637L17.3033 7.75736L16.2426 6.6967L17.8336 5.10571L18.8943 6.16637Z" />
      <path d="M17.8336 18.8944L16.2426 17.3034L17.3033 16.2428L18.8943 17.8337L17.8336 18.8944Z" />
      <path d="M12.75 18.75V21H11.25V18.75H12.75Z" />
      <path d="M5.25 12.75L3 12.75L3 11.25L5.25 11.25L5.25 12.75Z" />
      <path d="M7.75732 17.3033L6.16633 18.8943L5.10567 17.8337L6.69666 16.2427L7.75732 17.3033Z" />
      <path d="M6.69666 7.75744L5.10567 6.16645L6.16633 5.10579L7.75732 6.69678L6.69666 7.75744Z" />
    </svg>
  );
};

export const Toggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-ceter ml-4 w-[40px] mt-2 ">
      <label className="inline-flex items-center cursor-pointer">
        <input
          onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          type="checkbox"
          className="sr-only peer "
          data-testid="toggle-test"
          checked={resolvedTheme === "light"}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600 dark:peer-checked:bg-gray-600"></div>
      </label>
      <div className="ml-1 -mt-1">
        <Moon /> <Sun />
      </div>
    </div>
  );
};
