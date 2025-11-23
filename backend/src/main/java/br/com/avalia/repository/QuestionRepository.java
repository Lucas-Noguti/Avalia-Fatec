package br.com.avalia.repository;

import br.com.avalia.entity.QuestionEntity;
import br.com.avalia.entity.QuestionEntity.DifficultyLevel;
import br.com.avalia.entity.QuestionEntity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    
    List<QuestionEntity> findBySubject(String subject);
    
    List<QuestionEntity> findByType(QuestionType type);
    
    List<QuestionEntity> findByDifficulty(DifficultyLevel difficulty);
    
    List<QuestionEntity> findBySubjectAndType(String subject, QuestionType type);
    
    @Query("SELECT q FROM QuestionEntity q WHERE LOWER(q.statement) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<QuestionEntity> searchByStatement(@Param("keyword") String keyword);
    
    @Query("SELECT q FROM QuestionEntity q WHERE " +
           "(:subject IS NULL OR q.subject = :subject) AND " +
           "(:type IS NULL OR q.type = :type) AND " +
           "(:difficulty IS NULL OR q.difficulty = :difficulty) AND " +
           "(:keyword IS NULL OR LOWER(q.statement) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<QuestionEntity> findByFilters(
        @Param("subject") String subject,
        @Param("type") QuestionType type,
        @Param("difficulty") DifficultyLevel difficulty,
        @Param("keyword") String keyword
    );
}
