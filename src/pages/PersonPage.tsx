import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import { FilmCard } from "../components/FilmCard";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import { Subheader } from "../components/Subheader";
import { Title } from "../components/Title";
import {
  FilmsQuery,
  FilmsQueryVariables,
  PersonQuery,
  PersonQueryVariables,
} from "../generated/graphql";

const personQuery = gql`
  query Person($personId: ID) {
    person(id: $personId) {
      id
      name
      birthYear
      species {
        id
        averageHeight
        name
      }
    }
  }
`;

const filmsQuery = gql`
  query Films(
    $personId: ID
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    person(id: $personId) {
      filmConnection(
        first: $first
        after: $after
        last: $last
        before: $before
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            title
            releaseDate
            producers
            planetConnection {
              edges {
                node {
                  surfaceWater
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PersonPage = () => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const [{ data: personData, error: personError, fetching: personFetching }] =
    useQuery<PersonQuery, PersonQueryVariables>({
      query: personQuery,
      variables: {
        personId,
      },
    });

  const next = searchParams.get("next");
  const prev = searchParams.get("prev");
  const [{ data: filmsData }] = useQuery<FilmsQuery, FilmsQueryVariables>({
    query: filmsQuery,
    variables: {
      personId,
      first: !!next || (!next && !prev) ? 1 : undefined,
      after: next || undefined,
      last: !!prev ? 1 : undefined,
      before: prev || undefined,
    },
  });

  const producers = useMemo(() => {
    const result: Record<string, number> = {};

    filmsData?.person?.filmConnection?.edges
      ?.flatMap((e) => e?.node?.producers)
      .forEach((p) => {
        if (p) {
          result[p] = result[p] ? result[p] + 1 : 1;
        }
      });

    return result;
  }, [filmsData]);

  return (
    <Layout>
      {personFetching ? (
        <div>Loading...</div>
      ) : !!personError ? (
        <div>
          <p>An unexpected error ocurred</p>
          <div>{personError.message}</div>
        </div>
      ) : (
        <>
          <Title>{personData?.person?.name || "Unknown"}</Title>
          <p className="text-center">
            Born: {personData?.person?.birthYear || "Unknown"}
          </p>
          <Subheader>Producers worked with</Subheader>
          <ul className="text-center">
            {Object.keys(producers).map((p) => (
              <li key={p}>
                {p} - {producers[p]} {producers[p] > 1 ? "movies" : "movie"}
              </li>
            ))}
          </ul>
          <Subheader>Species</Subheader>
          <ul className="text-center">
            <li>Name: {personData?.person?.species?.name || "Unknown"}</li>
            <li>
              Average height:{" "}
              {personData?.person?.species?.averageHeight || "Unknown"}
            </li>
          </ul>
          <Subheader>Films</Subheader>
          {filmsData?.person?.filmConnection?.edges?.map((e) => (
            <FilmCard
              key={e?.node?.id}
              title={e?.node?.title}
              releaseDate={e?.node?.releaseDate}
              planets={e?.node?.planetConnection?.edges?.map((e) => e?.node)}
            />
          ))}
          <Pagination pageInfo={filmsData?.person?.filmConnection?.pageInfo} />
        </>
      )}
    </Layout>
  );
};

export default PersonPage;
