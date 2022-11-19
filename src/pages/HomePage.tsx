import { gql, useQuery } from "urql";
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
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center mt-8">People</h1>
      <section className="mt-8">
        <ul className="grid gap-4 grid-cols-3 grid-rows-auto">
          {data?.allPeople?.edges?.map((e) => (
            <li className="flex justify-center align-middle p-12 rounded border-2 hover:cursor-pointer hover:bg-slate-100">
              {e?.node?.name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
