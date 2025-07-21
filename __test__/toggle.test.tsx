import { expect, test } from "vitest";
import { render } from "./index";
import Home from "@/app/page";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "@/app/components/providers";

test("click toggle changes theme", async () => {
  render(
    <Providers>
      <Home />
    </Providers>
  );
  const button = screen.getByTestId("toggle-test");
  expect(button).toBeDefined();
  const colorScheme =
    document.documentElement.style.getPropertyValue("color-scheme");

  expect(["light", "dark"]).toContain(colorScheme);

  const opposite = colorScheme === "light" ? "dark" : "light";

  await userEvent.click(button);
  expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe(
    opposite
  );

  await userEvent.click(button);
  expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe(
    colorScheme
  );
});
