package data.daos.impl;

import data.daos.CommentDAO;
import data.entities.Comment;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component("commentDAO")
public class CommentDAOImpl extends DAOImpl<Integer , Comment> implements CommentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional(readOnly=true)
    public List getCommentsMovie(int movieId, int offset, int limit) {
        Query query = entityManager.createNativeQuery("SELECT d.id, d.muserid, d.timestamp, d.content, d.likes, m.username, m.avatar FROM (SELECT c.* FROM comment c WHERE c.parent=0 and c.movieid = ?1) d INNER JOIN muser m ON (m.id=d.muserid) ORDER BY d.id DESC")
                .setParameter(1, movieId)
                .setFirstResult(offset)
                .setMaxResults(limit);

        List<Map> res = new ArrayList<>();

        List<Object[]> results = query.getResultList();

        results.forEach((record) -> {
            var map = new HashMap<>();
            map.put("id", record[0]);
            map.put("userId", record[1]);
            map.put("date", record[2]);
            map.put("content", record[3]);
            map.put("likes", record[4]);
            map.put("username", record[5]);
            map.put("userAvatar", record[6]);
            res.add(map);
        });

        return res;
    }


}
