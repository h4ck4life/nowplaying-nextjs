import Head from "next/head";
import Image from "next/image";

import { gql } from "@apollo/client";
import client from "../apollo-client";

import dayjs from "dayjs";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiCameraMovie, BiLike, BiMovie } from "react-icons/bi";
import { MdLanguage, MdMovieFilter } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";

type AppProps = {
  movies: any[];
};

export default function Home({ movies }: AppProps) {
  const minutesToHourFormatter = function (minute: any) {
    let sec_num = parseInt(minute, 10); // don't forget the second param
    let hours: any = Math.floor(sec_num / 3600);
    let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    let seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}h ${seconds}m`;
  };

  return (
    <>
      <Head>
        <title>Now Playing Movies</title>
      </Head>
      <div className="container mx-auto">
        <div className="table-cell text-purple-800">
          <BiCameraMovie className="text-6xl inline-flex mr-2" />
          <span className="text-3xl font-semibold align-middle">
            NowPlaying
          </span>
        </div>
        <div className="flex flex-wrap -mx-4 mt-2">
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
                    {/* <span className="inline-block px-2 py-1 leading-none bg-purple-100 text-purple-800 rounded font-semibold uppercase tracking-wide text-xs">
                      <BiCameraMovie className="inline-block mr-1" />
                      Now Playing
                    </span> */}
                    <span
                      title="Rating"
                      className="inline-block px-2 py-1 ml-1 leading-none bg-indigo-600 text-gray-100 rounded font-bold uppercase tracking-wide text-sm"
                    >
                      <BiLike className="inline-block mr-1" />
                      {(data.node.rating as number).toFixed(1)}
                    </span>
                    <span
                      title="Language"
                      className="inline-block px-2 py-1 ml-1 leading-none bg-gray-100 text-purple-800 rounded font-bold capitalize tracking-wide text-sm"
                    >
                      {data.node.originalLanguage}
                    </span>
                    <span
                      title="Runtime"
                      className="inline-block px-2 py-1 ml-1 leading-none bg-gray-100 text-purple-800 rounded font-bold tracking-wide text-sm"
                    >
                      {minutesToHourFormatter(data.node.runtime)}
                    </span>
                    <span
                      title="Released date"
                      className="inline-block  px-2 py-1 ml-1 leading-none bg-gray-100 text-purple-800 rounded font-bold capitalize tracking-wide text-sm"
                    >
                      {dayjs(data.node.releaseDate).format("DD MMM YYYY")}
                    </span>
                    <h2 className="mt-4 mb-3 font-bold text-2xl">
                      {data.node.originalTitle}
                    </h2>
                    <p className="text-base">{data.node.overview}</p>
                  </div>
                  <div className="p-2 border-t border-b text-xs bg-gray-50">
                    <div className="flex overflow-x-scroll">
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
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcWw8AAf8BPlp9PLwAAAAASUVORK5CYII="
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
                  {/* <div className="p-4 flex items-center text-sm text-gray-600">
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
                  </div> */}
                  <div className="p-4 flex items-center text-sm text-gray-600">
                    <a
                      href={data.node.homepage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="bg-gray-50 hover:bg-gray-200 cursor-pointer p-1 rounded mr-2 font-semibold">
                        <MdLanguage className="inline-flex mr-1" />
                        Official Site
                      </span>
                    </a>

                    {data.node.videos && data.node.videos.length > 0 ? (
                      <a
                        href={data.node.videos[0].links.web}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="bg-gray-50 hover:bg-gray-200 cursor-pointer p-1 rounded mr-2 font-semibold">
                          <BiMovie className="inline-flex mr-1" />
                          Trailer
                        </span>
                      </a>
                    ) : (
                      ""
                    )}
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
          nowPlaying(first: 20) {
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
                productionCompanies {
                  name
                  logo(size: W45)
                }
                videos {
                  site
                  type
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
    `,
  });

  return {
    props: {
      movies: data.movies.nowPlaying.edges,
    },
  };
}
