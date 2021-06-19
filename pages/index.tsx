/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import OverlayPoster from "../components/OverlayPoster";
import { useEffect, useState } from "react";
import { MdMovieFilter } from "react-icons/md";
import MovieCard from "../components/MovieCard";

type AppProps = {
  movies: any[];
};

export default function Home({ movies }: AppProps) {
  const [isShowPoster, setIsShowPoster] = useState(false);
  const [posterSrc, setPosterSrc] = useState("");
  const [movieList, setMovieList] = useState(movies);
  const [isLoading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState("");

  useEffect(() => {
    setNextCursor(movieList[movieList.length - 1].cursor);
    return () => {};
  }, []);

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
          {movieList.map((data) => {
            return (
              <MovieCard
                key={data.node.id}
                data={data}
                setIsShowPoster={setIsShowPoster}
                setPosterSrc={setPosterSrc}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

const getNextMoviesGql = (first: number, after: string | number = 0) => {
  return gql`
    query getMovies {
      movies {
        nowPlaying(first: ${first}, after: ${after}) {
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
    query: getNextMoviesGql(20),
  });
  return {
    props: {
      movies: data.movies.nowPlaying.edges,
    },
  };
}
