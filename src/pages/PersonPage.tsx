import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";
import { PersonQuery, PersonQueryVariables } from "../generated/graphql";

const query = gql`
  query Person($personId: ID) {
    person(id: $personId) {
      id
      name
      filmConnection {
        edges {
          node {
            id
            producers
          }
        }
      }
    }
  }
`;

const PersonPage = () => {
  const { personId } = useParams();
  const [{ data }] = useQuery<PersonQuery, PersonQueryVariables>({
    query,
    variables: {
      personId,
    },
  });

  const producers = useMemo(() => {
    const result: Record<string, number> = {};

    data?.person?.filmConnection?.edges
      ?.flatMap((e) => e?.node?.producers)
      .forEach((p) => {
        if (p) {
          result[p] = result[p] ? result[p] + 1 : 1;
        }
      });

    return result;
  }, [data]);

  return (
    <Layout>
      <Title>{data?.person?.name || "Unknown"}</Title>
      <h2 className="font-medium text-2xl mt-4 text-center">
        Producers worked with
      </h2>
      <ul className="text-center">
        {Object.keys(producers).map((p) => (
          <li key={p}>
            {p} - {producers[p]} {producers[p] > 1 ? "movies" : "movie"}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default PersonPage;
