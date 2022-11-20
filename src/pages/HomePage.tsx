import { Link } from "react-router-dom";
import { gql, useQuery } from "urql";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";
import { HomeQuery } from "../generated/graphql";

const query = gql`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const HomePage = () => {
  const [{ data }] = useQuery<HomeQuery>({ query });

  return (
    <Layout>
      <Title>People</Title>
      <section className="mt-8">
        <ul className="grid gap-4 grid-cols-3 grid-rows-auto">
          {data?.allPeople?.edges?.map((e) => (
            <li>
              <Link
                to={`/person/${e?.node?.id}`}
                className="flex justify-center align-middle p-12 rounded border-2 hover:cursor-pointer hover:bg-slate-100"
              >
                {e?.node?.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default HomePage;
