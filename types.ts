type tShow = {
  id: number;
  name: string;
  summary: string;
  image: string;

};

type tEpisode = {
  id: number;
  name: string;
  season: number;
  number: number;
};

type tShowData = {
  show: {
    id: number,
    name: string,
    summary: string,
    image: {
      medium: string
    }
  }
}[]

type tEpisodeData = tEpisode[]
