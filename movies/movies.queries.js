import client from "../client";

export default {
    Query: {
        // 이것만으로 우리의 데이터베이스로 가서 모든 영화들을 검색하게 된다.
        movies: () => client.movie.findMany(),
        movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
      },
}