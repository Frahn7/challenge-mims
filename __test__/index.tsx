import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Toaster } from "@/app/components/ui/sonner";
import { ThemeProvider } from "../src/app/components/ui/theme-provider";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
