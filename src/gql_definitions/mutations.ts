import gql from 'graphql-tag';

const CREATE_CITY = gql`
  mutation createCity($input: CreateCityInput!) {
    createCity(input: $input) {
      id
      name
      touristic
      population
    }
  }
`;

const CREATE_COUNTRY = gql`
  mutation createCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      id
      name
      continent
      population
    }
  }
`;

const REMOVE_COUNTRY = gql`
  mutation removeCountry($id: Int!) {
    removeCountry(id: $id)
  }
`;

const REMOVE_CITY = gql`
  mutation removeCity($id: Int!) {
    removeCity(id: $id)
  }
`;

export const Mutations = {
  CREATE_CITY,
  CREATE_COUNTRY,
  REMOVE_COUNTRY,
  REMOVE_CITY,
};
