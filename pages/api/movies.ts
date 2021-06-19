// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "@apollo/client";
import client from "../../apollo-client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { nextCursor } = JSON.parse(req.body);
  const { data } = await client.query({
    query: gql`
      query getMovies($first: Int, $after: String) {
        movies {
          nowPlaying(first: $first, after: $after) {
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
    `,
    variables: {
      first: 12,
      after: nextCursor
    },
    errorPolicy: "all",
  });
  res.status(200).json(data);
}
