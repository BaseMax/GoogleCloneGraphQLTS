# Search Engine Site (GraphQL-based) in TypeScript and NestJS

This is a search engine site built using TypeScript and NestJS, with a GraphQL API. The application allows users to search for content and retrieve relevant results. It utilizes the power of GraphQL for efficient querying and retrieving data from various sources.

## Features

- Search for content using keywords or phrases
- Retrieve relevant search results based on the query
- Support for advanced search filters and sorting options
- Pagination for browsing through search results
- Integration with various data sources for retrieving content
- Full-text search capabilities for accurate and fast results
- User authentication and authorization for personalized search experiences

## Requirements

- Node.js (v12 or above)
- TypeScript (v4 or above)
- NestJS (v8 or above)
- MongoDB or any other supported database for data storage

## Getting Started

Clone the repository:

```shell
git clone https://github.com/your-username/search-engine.git
cd search-engine
```

Install the dependencies:

```shell
npm install
```

Configure the environment variables:

- Rename the .env.example file to `.env`.
- Modify the values in the .env file according to your setup.
- Ensure you provide the necessary credentials and configurations for the database.
- Build the application:

```shell
npm run build
```

## GraphQL

### Queries

- `search(query: String!, filters: SearchFilters, pagination: PaginationInput): SearchResult`: Retrieves search results based on the provided query string and optional filters and pagination.
- `getSearchResult(id: ID!): SearchResult`: Retrieves a specific search result by its unique identifier.
- `getUserSearchHistory(userId: ID!): [SearchHistory]`: Retrieves the search history of a specific user.
- `getPopularSearches: [String]`: Retrieves a list of popular search terms or queries.

### Mutations

- `createUserSearchHistory(userId: ID!, query: String!): SearchHistory`: Creates a new search history entry for a user with the provided query string.
- `clearUserSearchHistory(userId: ID!): Boolean`: Clears the search history of a specific user.
- `createSearchResult(title: String!, url: String!, description: String!): SearchResult`: Creates a new search result with the provided title, URL, and description.
- `updateSearchResult(id: ID!, title: String, url: String, description: String): SearchResult`: Updates an existing search result identified by its unique identifier with the provided fields.
- `deleteSearchResult(id: ID!): Boolean`: Deletes a search result identified by its unique identifier.

Copyright 2023, Max Base
