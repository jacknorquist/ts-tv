import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import {
  searchShowsByTerm,
  getEpisodesOfShow,
  MISSING_IMAGE_URL,
} from "./models";

const fetchMocker = createFetchMock(vi);

beforeEach(function () {
  fetchMocker.enableMocks();
});

afterEach(function () {
  fetchMocker.disableMocks();
});

describe("searchShowsByTerm", function () {
  const data = [
    {
      show: { id: 1, name: "A", summary: "B", image: { medium: "img" } },
      score: 1,
    }, {
      show: { id: 2, name: "C", summary: "D", },
      score: 1,
    },
  ];
  debugger;
  const expected = [
    { id: 1, name: "A", summary: "B", image: "img" },
    { id: 2, name: "C", summary: "D", image: MISSING_IMAGE_URL },
  ];

  test("ok", async function () {
    fetchMocker.doMockOnce(JSON.stringify(data));
    const resp = await searchShowsByTerm("dog");
    expect(resp).toEqual(expected);
  });

  test("nothing found", async function () {
    fetchMocker.doMockOnce(JSON.stringify([]));
    const resp = await searchShowsByTerm("dog");
    expect(resp).toEqual([]);
  });
});

describe("getEpisodesOfShow", function () {
  test("ok", async function () {
    fetchMocker.doMockOnce(JSON.stringify([
      { id: 1, name: "Pilot", season: 1, number: 1 },
      { id: 2, name: "Second", season: 1, number: 2 },
    ]));
    const resp = await getEpisodesOfShow(1);
    expect(resp).toEqual([
      { id: 1, name: "Pilot", season: 1, number: 1 },
      { id: 2, name: "Second", season: 1, number: 2 },
    ]);
  });
  test("ok - real", async function () {
    fetchMocker.disableMocks();
    const resp = await getEpisodesOfShow(1);
    expect(resp[0]).toEqual({ id: 1, name: "Pilot", season: 1, number: 1 });
  });
});