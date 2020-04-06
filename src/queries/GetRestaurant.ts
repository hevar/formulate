import gql from "graphql-tag";

export const GetRestaurant = gql`
  query($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      description
      address
      rating
    }
  }
`;
