/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import OverlayPoster from "../components/OverlayPoster";
import { MouseEventHandler, useEffect, useState } from "react";
import { MdMovieFilter } from "react-icons/md";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

type AppProps = {
  movies: any[];
  nextFirstCursor: string;
};

export default function Home({ movies, nextFirstCursor }: AppProps) {
  const [isShowPoster, setIsShowPoster] = useState(false);
  const [posterSrc, setPosterSrc] = useState("");
  const [movieList, setMovieList] = useState(movies);
  const [isLoading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(nextFirstCursor);

  useEffect(() => {
    return () => {};
  }, []);

  const loadMore: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true);
    let response = await fetch(`/api/movies`, {
      method: "POST",
      body: JSON.stringify({ nextCursor }),
    });
    if (response.ok) {
      setLoading(false);
      let data = await response.json();
      setMovieList((movieList) => [
        ...movieList,
        ...data.movies.nowPlaying.edges,
      ]);
      setNextCursor(data.movies.nowPlaying.pageInfo.endCursor);
    } else {
      setLoading(false);
      console.log("HTTP-Error: " + response.status);
    }
  };

  return (
    <>
      <Head>
        <title>Now Playing Movies</title>
      </Head>
      {isShowPoster == true ? (
        <OverlayPoster src={posterSrc} setIsShowPoster={setIsShowPoster} />
      ) : (
        ""
      )}
      <div className="container mx-auto">
        <div className="table-cell text-purple-500">
          <MdMovieFilter className="text-6xl inline-flex mr-2" />
          <span className="text-3xl font-semibold align-middle">
            NowPlaying
          </span>
        </div>
        <div className="flex flex-wrap -mx-4 mt-2">
          {movieList.map((data, index) => {
            if (data.node) {
              return (
                <MovieCard
                  key={data.node.id}
                  data={data}
                  setIsShowPoster={setIsShowPoster}
                  setPosterSrc={setPosterSrc}
                />
              );
            }
          })}
        </div>
        <Loader isLoading={isLoading} loadMore={loadMore} />
      </div>
    </>
  );
}

const getNextMoviesGql = () => {
  return gql`
    query getMovies($first: Int) {
      movies {
        nowPlaying(first: $first) {
          pageInfo {
            endCursor
            startCursor
          }
          totalCount
          edges {
            cursor
            node {
              id
              revenue
              runtime
              releaseDate
              rating
              overview
              originalLanguage
              numberOfRatings
              homepage
              poster(size: W500)
              originalTitle
              genres {
                name
              }
              videos {
                links {
                  web
                }
              }
              credits {
                cast {
                  value {
                    name
                    externalIds {
                      instagram
                    }
                    birthday
                    profilePicture(size: W185)
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getNextMoviesGql(),
    variables: {
      first: 12,
    },
    errorPolicy: "all",
  });
  return {
    props: {
      movies: data.movies.nowPlaying.edges,
      nextFirstCursor: data.movies.nowPlaying.pageInfo.endCursor,
    },
  };
}
