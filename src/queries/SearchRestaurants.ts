import gql from "graphql-tag";

export const SearchRestaurants = gql`
  query($searchQuery: String) {
    listRestaurants(filter: {
      searchField: {
        contains: $searchQuery
      }
    }) {
      items {
        name
        description
        address
        rating
        id
      }
    }
  }
`;
