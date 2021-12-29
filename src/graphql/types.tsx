/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  name: Scalars['String'];
  touristic?: Maybe<Scalars['Boolean']>;
  population?: Maybe<Scalars['Int']>;
};

export enum Continent {
  Asia = 'Asia',
  Europe = 'Europe',
  America = 'America',
  Africa = 'Africa'
}

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int'];
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
  cities?: Maybe<Array<City>>;
  treaties?: Maybe<Array<Treaty>>;
  capital: City;
  continent?: Maybe<Continent>;
};

export type CreateCityInput = {
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
  countryId: Scalars['Int'];
};

export type CreateCountryInput = {
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
  continent?: Maybe<Continent>;
};

export type CreateTreatyInput = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCountry: Country;
  updateCountry: Country;
  removeCountry?: Maybe<Scalars['Int']>;
  addCountryToTreaty: Country;
  removeCountryFromTreaty: Country;
  createCity: City;
  updateCity: City;
  removeCity?: Maybe<Scalars['Int']>;
  createTreaty: Treaty;
  updateTreaty: Treaty;
  removeTreaty: Treaty;
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationRemoveCountryArgs = {
  id: Scalars['Int'];
};


export type MutationAddCountryToTreatyArgs = {
  treatyId: Scalars['Int'];
  countryId: Scalars['Int'];
};


export type MutationRemoveCountryFromTreatyArgs = {
  treatyId: Scalars['Int'];
  countryId: Scalars['Int'];
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};


export type MutationRemoveCityArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTreatyArgs = {
  input: CreateTreatyInput;
};


export type MutationUpdateTreatyArgs = {
  input: UpdateTreatyInput;
};


export type MutationRemoveTreatyArgs = {
  id: Scalars['Int'];
};

export type OnentLocation = {
  __typename?: 'OnentLocation';
  Code?: Maybe<Scalars['String']>;
  SiteCodeLength?: Maybe<Scalars['Int']>;
  SiteId?: Maybe<Scalars['Int']>;
  EmgName?: Maybe<Scalars['String']>;
  StateId?: Maybe<Scalars['Int']>;
  StateName?: Maybe<Scalars['String']>;
  CountryId?: Maybe<Scalars['Int']>;
  CountryName?: Maybe<Scalars['String']>;
  CityBasarId?: Maybe<Scalars['Int']>;
  CityName?: Maybe<Scalars['String']>;
  CountyBasarId?: Maybe<Scalars['Int']>;
  CountyName?: Maybe<Scalars['String']>;
  BcoCompanyId?: Maybe<Scalars['Int']>;
  BcoName?: Maybe<Scalars['String']>;
  PlanningResponsibleUserId?: Maybe<Scalars['Int']>;
  PlanningResponsibleUserName?: Maybe<Scalars['String']>;
  GatheringCenterTypeId?: Maybe<Scalars['String']>;
  GatheringCenterTypeName?: Maybe<Scalars['String']>;
  RealMainRegionId?: Maybe<Scalars['Int']>;
  RealMainRegionName?: Maybe<Scalars['String']>;
  RealRegionId?: Maybe<Scalars['Int']>;
  RealRegionName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  countries: Array<Country>;
  country: Country;
  cities: Array<City>;
  city: City;
  treaties: Array<Treaty>;
  treaty: Treaty;
  findSiteLocations: Array<OnentLocation>;
  runScript1: Scalars['String'];
};


export type QueryCountryArgs = {
  id: Scalars['Int'];
};


export type QueryCitiesArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryTreatyArgs = {
  id: Scalars['Int'];
};


export type QueryFindSiteLocationsArgs = {
  cityName: Scalars['String'];
};

export type Treaty = {
  __typename?: 'Treaty';
  id: Scalars['Int'];
  name: Scalars['String'];
  countries?: Maybe<Array<Country>>;
};

export type UpdateCityInput = {
  name?: Maybe<Scalars['String']>;
  population?: Maybe<Scalars['Int']>;
  countryId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateCountryInput = {
  name?: Maybe<Scalars['String']>;
  population?: Maybe<Scalars['Int']>;
  continent?: Maybe<Continent>;
  id: Scalars['Int'];
};

export type UpdateTreatyInput = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type CreateCityMutationVariables = Exact<{
  input: CreateCityInput;
}>;


export type CreateCityMutation = (
  { __typename?: 'Mutation' }
  & { createCity: (
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name' | 'touristic' | 'population'>
  ) }
);

export type CreateCountryMutationVariables = Exact<{
  input: CreateCountryInput;
}>;


export type CreateCountryMutation = (
  { __typename?: 'Mutation' }
  & { createCountry: (
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name' | 'continent' | 'population'>
  ) }
);

export type RemoveCountryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCountryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCountry'>
);

export type RemoveCityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCity'>
);

export type CitiesQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
}>;


export type CitiesQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name'>
  )> }
);

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name' | 'continent'>
  )> }
);


export const CreateCityDocument = gql`
    mutation createCity($input: CreateCityInput!) {
  createCity(input: $input) {
    id
    name
    touristic
    population
  }
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;
export const CreateCountryDocument = gql`
    mutation createCountry($input: CreateCountryInput!) {
  createCountry(input: $input) {
    id
    name
    continent
    population
  }
}
    `;
export type CreateCountryMutationFn = Apollo.MutationFunction<CreateCountryMutation, CreateCountryMutationVariables>;

/**
 * __useCreateCountryMutation__
 *
 * To run a mutation, you first call `useCreateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCountryMutation, { data, loading, error }] = useCreateCountryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCountryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCountryMutation, CreateCountryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCountryMutation, CreateCountryMutationVariables>(CreateCountryDocument, options);
      }
export type CreateCountryMutationHookResult = ReturnType<typeof useCreateCountryMutation>;
export type CreateCountryMutationResult = Apollo.MutationResult<CreateCountryMutation>;
export type CreateCountryMutationOptions = Apollo.BaseMutationOptions<CreateCountryMutation, CreateCountryMutationVariables>;
export const RemoveCountryDocument = gql`
    mutation removeCountry($id: Int!) {
  removeCountry(id: $id)
}
    `;
export type RemoveCountryMutationFn = Apollo.MutationFunction<RemoveCountryMutation, RemoveCountryMutationVariables>;

/**
 * __useRemoveCountryMutation__
 *
 * To run a mutation, you first call `useRemoveCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCountryMutation, { data, loading, error }] = useRemoveCountryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCountryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCountryMutation, RemoveCountryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCountryMutation, RemoveCountryMutationVariables>(RemoveCountryDocument, options);
      }
export type RemoveCountryMutationHookResult = ReturnType<typeof useRemoveCountryMutation>;
export type RemoveCountryMutationResult = Apollo.MutationResult<RemoveCountryMutation>;
export type RemoveCountryMutationOptions = Apollo.BaseMutationOptions<RemoveCountryMutation, RemoveCountryMutationVariables>;
export const RemoveCityDocument = gql`
    mutation removeCity($id: Int!) {
  removeCity(id: $id)
}
    `;
export type RemoveCityMutationFn = Apollo.MutationFunction<RemoveCityMutation, RemoveCityMutationVariables>;

/**
 * __useRemoveCityMutation__
 *
 * To run a mutation, you first call `useRemoveCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCityMutation, { data, loading, error }] = useRemoveCityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCityMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCityMutation, RemoveCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCityMutation, RemoveCityMutationVariables>(RemoveCityDocument, options);
      }
export type RemoveCityMutationHookResult = ReturnType<typeof useRemoveCityMutation>;
export type RemoveCityMutationResult = Apollo.MutationResult<RemoveCityMutation>;
export type RemoveCityMutationOptions = Apollo.BaseMutationOptions<RemoveCityMutation, RemoveCityMutationVariables>;
export const CitiesDocument = gql`
    query cities($name: String) {
  cities(name: $name) {
    id
    name
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const CountriesDocument = gql`
    query countries {
  countries {
    id
    name
    continent
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  City: ResolverTypeWrapper<City>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Continent: Continent;
  Country: ResolverTypeWrapper<Country>;
  CreateCityInput: CreateCityInput;
  CreateCountryInput: CreateCountryInput;
  CreateTreatyInput: CreateTreatyInput;
  Mutation: ResolverTypeWrapper<{}>;
  OnentLocation: ResolverTypeWrapper<OnentLocation>;
  Query: ResolverTypeWrapper<{}>;
  Treaty: ResolverTypeWrapper<Treaty>;
  UpdateCityInput: UpdateCityInput;
  UpdateCountryInput: UpdateCountryInput;
  UpdateTreatyInput: UpdateTreatyInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  City: City;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Country: Country;
  CreateCityInput: CreateCityInput;
  CreateCountryInput: CreateCountryInput;
  CreateTreatyInput: CreateTreatyInput;
  Mutation: {};
  OnentLocation: OnentLocation;
  Query: {};
  Treaty: Treaty;
  UpdateCityInput: UpdateCityInput;
  UpdateCountryInput: UpdateCountryInput;
  UpdateTreatyInput: UpdateTreatyInput;
};

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  touristic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cities?: Resolver<Maybe<Array<ResolversTypes['City']>>, ParentType, ContextType>;
  treaties?: Resolver<Maybe<Array<ResolversTypes['Treaty']>>, ParentType, ContextType>;
  capital?: Resolver<ResolversTypes['City'], ParentType, ContextType>;
  continent?: Resolver<Maybe<ResolversTypes['Continent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationCreateCountryArgs, 'input'>>;
  updateCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationUpdateCountryArgs, 'input'>>;
  removeCountry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveCountryArgs, 'id'>>;
  addCountryToTreaty?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationAddCountryToTreatyArgs, 'treatyId' | 'countryId'>>;
  removeCountryFromTreaty?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationRemoveCountryFromTreatyArgs, 'treatyId' | 'countryId'>>;
  createCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationCreateCityArgs, 'input'>>;
  updateCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationUpdateCityArgs, 'input'>>;
  removeCity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveCityArgs, 'id'>>;
  createTreaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<MutationCreateTreatyArgs, 'input'>>;
  updateTreaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<MutationUpdateTreatyArgs, 'input'>>;
  removeTreaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<MutationRemoveTreatyArgs, 'id'>>;
};

export type OnentLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OnentLocation'] = ResolversParentTypes['OnentLocation']> = {
  Code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SiteCodeLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  SiteId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  EmgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  StateId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  StateName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  CountryId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  CountryName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  CityBasarId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  CityName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  CountyBasarId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  CountyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  BcoCompanyId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  BcoName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PlanningResponsibleUserId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  PlanningResponsibleUserName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GatheringCenterTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GatheringCenterTypeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RealMainRegionId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  RealMainRegionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RealRegionId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  RealRegionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<QueryCountryArgs, 'id'>>;
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, never>>;
  city?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<QueryCityArgs, 'id'>>;
  treaties?: Resolver<Array<ResolversTypes['Treaty']>, ParentType, ContextType>;
  treaty?: Resolver<ResolversTypes['Treaty'], ParentType, ContextType, RequireFields<QueryTreatyArgs, 'id'>>;
  findSiteLocations?: Resolver<Array<ResolversTypes['OnentLocation']>, ParentType, ContextType, RequireFields<QueryFindSiteLocationsArgs, 'cityName'>>;
  runScript1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TreatyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Treaty'] = ResolversParentTypes['Treaty']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countries?: Resolver<Maybe<Array<ResolversTypes['Country']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  City?: CityResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OnentLocation?: OnentLocationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Treaty?: TreatyResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
