import { useSpring, animated } from "react-spring";

type AppProps = {
  isLoading: boolean;
  loadMore: any;
};

export default function Loader({ isLoading, loadMore }: AppProps) {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <div className="flex justify-center mb-1 mt-1">
      {isLoading ? (
        <animated.svg
          style={props}
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </animated.svg>
      ) : (
        <animated.button
          style={props}
          className="p-2 border-gray-900 border-2 rounded font-bold tracking-wide"
          onClick={loadMore}
        >
          Load More
        </animated.button>
      )}
    </div>
  );
}
