"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "./ui/theme-provider";
import { store } from "../store";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  );
};
