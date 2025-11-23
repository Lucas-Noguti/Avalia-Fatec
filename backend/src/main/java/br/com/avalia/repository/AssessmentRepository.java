package br.com.avalia.repository;

import br.com.avalia.entity.AssessmentEntity;
import br.com.avalia.entity.AssessmentEntity.AssessmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<AssessmentEntity, Long> {
    
    List<AssessmentEntity> findByStatus(AssessmentStatus status);
    
    List<AssessmentEntity> findByCourse(String course);
    
    List<AssessmentEntity> findByProfessor(String professor);
    
    @Query("SELECT a FROM AssessmentEntity a ORDER BY a.createdAt DESC")
    List<AssessmentEntity> findAllOrderByCreatedAtDesc();
    
    @Query("SELECT a FROM AssessmentEntity a WHERE a.status = 'PUBLISHED' ORDER BY a.examDate DESC")
    List<AssessmentEntity> findPublishedAssessments();
}
