/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

type AppProps = {
  src: string;
  setIsShowPoster: any;
};

export default function OverlayPoster({ src, setIsShowPoster }: AppProps) {
  const hidePoster = () => {
    setIsShowPoster(false);
  };
  return (
    <div
      onClick={hidePoster}
      className="bg-black bg-opacity-70 flex items-center justify-center h-screen w-screen fixed z-40 top-0 left-0"
    >
      <div className="rounded-lg">
        <img
          className="object-cover select-none z-50 p-7"
          width=""
          height=""
          src={src}
          alt=""
        />
      </div>
    </div>
  );
}
