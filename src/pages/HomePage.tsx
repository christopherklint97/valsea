import { gql, useQuery } from "urql";

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
  const [data] = useQuery({ query });

  return <div>Home</div>;
};

export default HomePage;
