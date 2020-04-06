import gql from "graphql-tag";

export const ListRestaurants = gql`
  query {
    listRestaurants {
      items {
        id
        name
        description
        address
        rating
      }
    }
  }
`;
