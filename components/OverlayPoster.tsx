/* eslint-disable @next/next/no-img-element */

import { useSpring, animated } from "react-spring";

type AppProps = {
  src: string;
  setIsShowPoster: any;
};

export default function OverlayPoster({ src, setIsShowPoster }: AppProps) {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  const hidePoster = () => {
    setIsShowPoster(false);
  };
  return (
    <animated.div
      style={props}
      onClick={hidePoster}
      className="bg-black bg-opacity-70 flex items-center justify-center h-screen w-screen fixed z-40 top-0 left-0"
    >
      <div className="p-7">
        <img
          className="object-cover select-none z-50 rounded-lg shadow-lg"
          width=""
          height=""
          src={src}
          alt=""
        />
      </div>
    </animated.div>
  );
}
