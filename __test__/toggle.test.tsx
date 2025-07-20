import { expect, test } from "vitest";
import { render } from "./index";
import Home from "@/app/page";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("click toggle changes theme", async () => {
  render(<Home />);
  const button = screen.getByTestId("toggle-test");
  expect(button).toBeDefined();

  expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe(
    "light"
  );
  await userEvent.click(button);
  expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe(
    "dark"
  );
  await userEvent.click(button);
  expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe(
    "light"
  );
});
