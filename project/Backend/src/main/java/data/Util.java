package data;


import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import java.util.Arrays;
import java.util.List;

public class Util {

    @Transactional
    public static void createViews() {
        EntityManager entityManager =
                Persistence.createEntityManagerFactory("movieverse").createEntityManager();
        entityManager.getTransaction().begin();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS LatestMovies " +
            "AS (" +
                "SELECT tmdb, name, poster, release " +
                "FROM movie " +
                "WHERE release <= NOW() " +
                "ORDER BY release DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS PopularMovies " +
            "AS (" +
                "SELECT tmdb, name, poster, ratingsum / NULLIF(ratingcount,0) AS rating, COUNT(tmdb) AS total " +
                "FROM movie " +
                "LEFT JOIN usermovie ON usermovie.movieid = movie.tmdb " +
                "WHERE release >= NOW() - '1 month'\\:\\:interval " +
                "GROUP BY tmdb " +
                "ORDER BY total DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS UpcomingMovies " +
            "AS (" +
                "SELECT tmdb, name, poster, release " +
                "FROM movie " +
                "WHERE release > NOW() " +
                "ORDER BY release " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS BornToday " +
            "AS (" +
                "SELECT tmdb, name, image, DATE_PART('year', NOW()) - DATE_PART('year', birthdate) AS age, COUNT(tmdb) AS total " +
                "FROM member " +
                "JOIN moviemember ON memberid = tmdb " +
                "WHERE TO_CHAR(birthdate, 'MM-DD') = TO_CHAR(NOW(), 'MM-DD') " +
                    "AND image IS NOT NULL " +
                "GROUP BY tmdb " +
                "ORDER BY total DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS MostCredits " +
            "AS (" +
                "SELECT tmdb, name, image, COUNT(tmdb) AS total " +
                "FROM member " +
                "JOIN moviemember ON memberid = tmdb " +
                "GROUP BY tmdb " +
                "ORDER BY total DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Transactional
    public static void refreshViews() {
        EntityManager entityManager = Persistence.createEntityManagerFactory("movieverse").createEntityManager();
        entityManager.getTransaction().begin();

        List<String> views = Arrays.asList(
            "LatestMovies", "PopularMovies", "UpcomingMovies", "BornToday", "UpcomingMovies"
        );

        views.forEach(x -> entityManager.createNativeQuery("REFRESH MATERIALIZED VIEW " + x).executeUpdate());

        entityManager.getTransaction().commit();
        entityManager.close();
        System.out.println("views refreshed");
    }
}