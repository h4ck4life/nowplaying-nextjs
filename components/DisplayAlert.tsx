/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSpring, animated } from "react-spring";

type AppProps = {
  setShowAlert: any;
};

export default function DisplayAlert({ setShowAlert }: AppProps) {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 300 },
  });

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, []);

  return (
    <animated.div
      className="fixed left-1/2 bottom-5 p-2 z-50 cursor-pointer"
      style={{ transform: "translateX(-50%)", ...props }}
    >
      <div className="inline-flex items-center leading-none bg-purple-600 text-white rounded p-2 text-lg">
        <span className="inline-flex px-2">Pls retry later.</span>
      </div>
    </animated.div>
  );
}
