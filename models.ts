const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

type show = {
  score: number;
  show: Record<string, number>;

};
async function searchShowsByTerm(term: string) {
  const response = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
  const data = await response.json();
  console.log(data);

  return data.map(result => {
    const show = result.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image?.medium || MISSING_IMAGE_URL
    };
  });
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  if (!response.ok) throw new Error("404");
  const data = await response.json();
  return data.map(({ id, name, season, number }) => (
    { id, name, season, number }
  ));
}

export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};