package data.daos;

import data.entities.Movie;

import java.util.List;
import java.util.Map;


public interface MovieDAO extends DAO<Integer, Movie> {

    Movie loadEntityEager(String condition);
    public List<Map<String, Object>> getMemberMoviesFromTo(int memberId, int offset, int limit);
}
