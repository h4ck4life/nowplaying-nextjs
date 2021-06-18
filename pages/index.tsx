import Head from "next/head";
import Image from "next/image";

import { gql } from "@apollo/client";
import client from "../apollo-client";

import dayjs from "dayjs";
import { AiOutlineInstagram } from "react-icons/ai";

type AppProps = {
  movies: any[];
};

export default function Home({ movies }: AppProps) {
  return (
    <>
      <Head>
        <title>Now Playing Movies</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {movies.map((data) => {
            return (
              <div
                key={data.node.id}
                className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 "
              >
                <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                  <div className="relative pb-48 overflow-hidden">
                    <Image
                      className="absolute inset-0 h-full w-full object-cover select-none"
                      layout="fill"
                      src={data.node.poster}
                      alt={data.node.originalTitle}
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      Now Playing
                    </span>
                    <span
                      title="Rating"
                      className="inline-block px-2 py-1 ml-1 leading-none bg-green-600 text-gray-100 rounded-full font-bold uppercase tracking-wide text-sm"
                    >
                      {(data.node.rating as number).toFixed(1)}
                    </span>
                    <span
                      title="Language"
                      className="inline-block px-2 py-1 ml-1 leading-none bg-gray-100 text-gray-800 rounded-full font-bold uppercase tracking-wide text-sm"
                    >
                      {data.node.originalLanguage}
                    </span>
                    <span
                      title="Released date"
                      className="inline-block  px-2 py-1 ml-1 leading-none bg-gray-100 text-gray-800 rounded-full font-bold capitalize tracking-wide text-sm"
                    >
                      {dayjs(data.node.releaseDate).format("DD MMM YYYY")}
                    </span>
                    <h2 className="mt-2 mb-2 font-bold text-2xl">
                      {data.node.originalTitle}
                    </h2>
                    <p className="text-base">{data.node.overview}</p>
                  </div>
                  <div className="p-2 border-t border-b text-xs bg-gray-50">
                    <div className="flex overflow-x-scroll no-scrollbar">
                      {data.node.credits.cast.map(
                        (person: any, index: number) => {
                          if (index > 8) return;
                          return (
                            <div
                              key={person.value.name}
                              className="flex-shrink-0 m-2 p-2 shadow-md rounded-lg bg-white inline-flex"
                            >
                              <Image
                                className="object-cover rounded-lg select-none"
                                width="70"
                                height="100"
                                src={
                                  person.value.profilePicture ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={person.value.name}
                              />
                              <div className="ml-1 inline-flex p-1">
                                <div>
                                  <span className="block font-bold">
                                    {person.value.name}
                                  </span>
                                  <span className="block">
                                    {dayjs(person.value.birthday).format(
                                      "D MMM YYYY"
                                    )}
                                  </span>
                                  {person.value.externalIds.instagram != null &&
                                  person.value.externalIds.instagram != "" ? (
                                    <div className="block cursor-pointer">
                                      <a
                                        href={`https://www.instagram.com/${person.value.externalIds.instagram}`}
                                        className="no-underline text-pink-700"
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <AiOutlineInstagram className="inline-block" />
                                        <span className="ml-1 inline-block">
                                          {person.value.externalIds.instagram}
                                        </span>
                                      </a>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex items-center text-sm text-gray-600">
                    {data.node.productionCompanies.map((company: any) => {
                      if (company.logo) {
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={company.logo}
                            className="mr-2 w-auto select-none"
                            src={company.logo}
                            alt={company.name}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query getMovies {
        movies {
          nowPlaying(first: 12) {
            totalCount
            edges {
              cursor
              node {
                id
                revenue
                releaseDate
                rating
                overview
                originalLanguage
                numberOfRatings
                homepage
                poster(size: W500)
                originalTitle
                productionCompanies {
                  name
                  logo(size: W45)
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
    `,
  });

  return {
    props: {
      movies: data.movies.nowPlaying.edges,
    },
  };
}
