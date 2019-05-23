package data.daos.impl;

import data.DataUtil;
import data.daos.MUserDAO;
import data.entities.MUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


@Component("muserDAO")
public class MUserDAOImpl extends DAOImpl<Integer , MUser> implements MUserDAO {

    @PersistenceContext
	private EntityManager entityManager;

    @Autowired
    private DataUtil dataUtil;


    @Transactional(readOnly=true)
    public MUser queryMUser(String condition){
        Query query =  entityManager.createQuery("SELECT c FROM "+ entityClass.getName() + " c left join fetch c.userCountry left join fetch c.favouriteGenre WHERE " + condition);
        query.setHint("org.hibernate.cacheable", true);
        List<MUser> result = (List<MUser>) query.getResultList();
        return result.isEmpty() ? null : result.get(0);
    }


    public List<MUser> listReceivedMUser(int muserId) {
        String query = "select m.* from friendship as f inner join muser as m on (f.pending='t' and f.receiver=" +  muserId + " and f.sender=m.id)";
        Query e_query =  entityManager.createNativeQuery(query, MUser.class);
        e_query.setHint("org.hibernate.cacheable", true);
        return e_query.getResultList();
    }


    public List<MUser> listRequestedMUser(int muserId) {
        String query = "SELECT m.* FROM friendship as f JOIN muser as m on (f.pending='t' and f.sender="+  muserId + " and f.receiver=m.id)"; ;
        Query e_query =  entityManager.createNativeQuery(query,MUser.class);
        e_query.setHint("org.hibernate.cacheable", true);
        return e_query.getResultList();
    }


    public List<MUser> listFriends(int muserId){
        String query = "SELECT m.* FROM friendship as f JOIN muser as m on (f.pending='f' and ((f.sender="+  muserId + " and f.receiver=m.id) or (f.sender=m.id and f.receiver="+  muserId + ")))";
        Query e_query =  entityManager.createNativeQuery(query,MUser.class);
        e_query.setHint("org.hibernate.cacheable", true);
        return e_query.getResultList();
    }


    private static final String favoriteMoviesQuery =
        "SELECT tmdb, poster, datefavourite, 'favourite' AS type " +
        "FROM UserMovie " +
        "JOIN Movie on Movie.tmdb = UserMovie.movieid " +
        "WHERE muserid = ?1 " +
        "AND favourite=TRUE " +
        "ORDER BY datefavourite DESC " +
        "OFFSET ?2 " +
        "LIMIT ?3";

    private static final String recentMoviesQuery =
        "SELECT tmdb, poster, datewatched, 'recent' AS type " +
        "FROM UserMovie " +
        "JOIN Movie on Movie.tmdb = UserMovie.movieid " +
        "WHERE muserid = ?1 " +
        "AND status=TRUE " +
        "ORDER BY datewatched DESC " +
        "OFFSET ?2 " +
        "LIMIT ?3";

    private static final String watchlistQuery =
        "SELECT tmdb, poster, null, 'watchlist' AS type " +
        "FROM UserMovie " +
        "JOIN Movie on Movie.tmdb = UserMovie.movieid " +
        "WHERE muserid = ?1 " +
        "AND status=FALSE " +
        "OFFSET ?2 " +
        "LIMIT ?3";

    private static final String recommendedMovies =
        "TODO";


    public List<Map> allMovieTypes(int muserId, int begin, int limit) {
        Query query = entityManager.createNativeQuery(
            "(" + favoriteMoviesQuery + ")" +
            "UNION " +
            "(" + recentMoviesQuery + ")" +
            "UNION " +
            "(" + watchlistQuery + ")"
            //TODO union with recommended
        ).setParameter(1, muserId)
         .setParameter(2, begin)
         .setParameter(3, limit);

        List<Object[]> l = query.getResultList();
        return dataUtil.queryListToListMap(l, Arrays.asList("id", "poster", "date", "type"));
    }


    public List<Map> favouriteMovies(int muserId, int begin, int limit) {
        Query query = entityManager.createNativeQuery(favoriteMoviesQuery)
                                   .setParameter(1, muserId)
                                   .setParameter(2, begin)
                                   .setParameter(3, limit);

        List<Object[]> l = query.getResultList();
        return dataUtil.queryListToListMap(l, Arrays.asList("id", "poster", "date"));
    }


    public List<Map> recentMovies(int muserId, int begin, int limit) {
        Query query = entityManager.createNativeQuery(recentMoviesQuery)
                                   .setParameter(1, muserId)
                                   .setParameter(2, begin)
                                   .setParameter(3, limit);

        List<Object[]> l = query.getResultList();
        return dataUtil.queryListToListMap(l, Arrays.asList("id", "poster", "date"));
    }


    public List<Map> watchlist(int muserId, int begin, int limit) {
        Query query = entityManager.createNativeQuery(watchlistQuery)
                                   .setParameter(1, muserId)
                                   .setParameter(2, begin)
                                   .setParameter(3, limit);

        List<Object[]> l = query.getResultList();
        return dataUtil.queryListToListMap(l, Arrays.asList("id", "poster"));
    }


    public List<Map> recommendedMovies(int muserId, int begin, int limit) {
        //TODO
        return List.of();
    }
}
