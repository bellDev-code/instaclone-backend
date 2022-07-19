import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server"


const client = new PrismaClient()

// Type Definitions가 Prisma와 GraphQL로 작업할때 유일하게 신경써줘야한다.
// Type Definitions와 Schema를 일치시키는게 중요하다.
const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
    type Mutation {
      createMovie(title: String!, year:Int!, genre: String): Movie
      deleteMovie(id: Int!): Movie
    }
`;

const resolvers = {
  Query: {
    // 이것만으로 우리의 데이터베이스로 가서 모든 영화들을 검색하게 된다.
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) => 
      client.movie.create({ 
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id }})
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(() => console.log("Server is running on http://loaclhost:4000/"))