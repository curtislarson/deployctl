import { include } from "../src/utils/walk.ts";
import { assertEquals } from "./deps.ts";

Deno.test("include function test", async (t) => {
  await t.step("exclude", () => {
    // Sanity check
    assertEquals(
      include("/foo/node_modules/asd", undefined, undefined),
      true,
      "Sanity check default is included",
    );
    assertEquals(
      include("/foo/node_modules/asd", undefined, []),
      true,
      "Sanity check default is included with empty exclude array",
    );

    // Exclude top level
    assertEquals(
      include("node_modules", undefined, ["node_modules"]),
      false,
    );

    // Single star
    assertEquals(
      include("node_modules/foo", undefined, ["node_modules/*"]),
      false,
      "Top level bare exclude works",
    );

    // Exclude deep
    assertEquals(
      include("/foo/node_modules/asd", undefined, ["**/node_modules/**"]),
      false,
    );
  });

  await t.step("include", () => {
    // Sanity check
    assertEquals(
      include("/foo/node_modules/asd", undefined, undefined),
      true,
      "Sanity check default is included",
    );

    // Sanity check
    assertEquals(
      include("/foo/node_modules/asd", [], undefined),
      false,
      "Sanity check default is not included with empty include array",
    );

    // Matching extension is included
    assertEquals(
      include("/foo/bar/foo.ts", ["**/*.{ts}"], undefined),
      true,
    );

    // Non matching extension is not included
    assertEquals(
      include("/foo/bar/asd.json", ["**/*.{ts}"], undefined),
      false,
    );
  });
});
