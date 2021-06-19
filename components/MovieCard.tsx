import Image from "next/image";

import { gql } from "@apollo/client";
import client from "../apollo-client";

import { useSpring, animated } from "react-spring";
import ScrollContainer from "react-indiana-drag-scroll";

import dayjs from "dayjs";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiLike, BiMovie } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { MouseEventHandler } from "react";

type AppProps = {
  data: any;
  setIsShowPoster: any;
  setPosterSrc: any;
};

export default function MovieCard({
  data,
  setIsShowPoster,
  setPosterSrc,
}: AppProps) {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

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

  const showPoster: MouseEventHandler<HTMLImageElement> = (event) => {
    const posterSrc = event.currentTarget.getAttribute("data-src")!.toString();
    setPosterSrc(posterSrc);
    setIsShowPoster(true);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 ">
      <div className="c-card block bg-gray-900 shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <animated.div style={props} className="relative pb-48 overflow-hidden">
          <Image
            className="absolute inset-0 h-full w-full object-cover select-none cursor-pointer"
            layout="fill"
            data-src={data.node.poster}
            src={data.node.poster}
            alt={data.node.originalTitle}
            onClick={showPoster}
          />
        </animated.div>
        <div className="p-4">
          <span
            title="Rating"
            className="inline-block px-2 py-1 ml-1 leading-none bg-purple-600 text-gray-100 rounded font-bold uppercase tracking-wide text-sm"
          >
            <BiLike className="inline-block mr-1" />
            {(data.node.rating as number).toFixed(1)}
          </span>
          <span
            title="Language"
            className="inline-block px-2 py-1 ml-1 leading-none bg-gray-800 rounded font-bold capitalize tracking-wide text-sm"
          >
            {data.node.originalLanguage}
          </span>
          <span
            title="Runtime"
            className="inline-block px-2 py-1 ml-1 leading-none bg-gray-800 rounded font-bold tracking-wide text-sm"
          >
            {minutesToHourFormatter(data.node.runtime)}
          </span>
          <span
            title="Released date"
            className="inline-block  px-2 py-1 ml-1 leading-none bg-gray-800 rounded font-bold capitalize tracking-wide text-sm"
          >
            {dayjs(data.node.releaseDate).format("DD MMM YYYY")}
          </span>
          <h2 className="mt-4 mb-1 font-bold text-2xl">
            {data.node.originalTitle}
          </h2>
          <div className="mb-2 text-gray-500">
            {data.node.genres.map((genre: any, index: number) => {
              return (
                <span className="italic text-sm mr-1" key={index}>
                  {genre.name}
                  {index != data.node.genres.length - 1 ? "," : ""}
                </span>
              );
            })}
          </div>
          <p className="text-base">{data.node.overview}</p>
        </div>
        <div className="p-1 border-t border-b border-gray-800 text-xs bg-gray-700">
          <ScrollContainer className="flex overflow-x-scroll no-scrollbar">
            {data.node.credits.cast.map((person: any, index: number) => {
              if (index > 8) return;
              return (
                <div
                  key={person.value.name}
                  className="flex-shrink-0 m-2 p-2 shadow-md rounded-lg bg-gray-800 inline-flex"
                >
                  <Image
                    className="object-cover rounded-lg select-none"
                    width="70"
                    height="100"
                    src={
                      person.value.profilePicture ||
                      "https://via.placeholder.com/90"
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
                        {dayjs(person.value.birthday).format("D MMM YYYY")}
                      </span>
                      {person.value.externalIds.instagram != null &&
                      person.value.externalIds.instagram != "" ? (
                        <div className="block cursor-pointer">
                          <a
                            href={`https://www.instagram.com/${person.value.externalIds.instagram}`}
                            className="no-underline text-pink-500"
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
            })}
          </ScrollContainer>
        </div>
        <div className="p-4 flex items-center text-sm">
          <a href={data.node.homepage} target="_blank" rel="noreferrer">
            <span className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-1 rounded mr-2 font-semibold">
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
              <span className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-1 rounded mr-2 font-semibold">
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
}
