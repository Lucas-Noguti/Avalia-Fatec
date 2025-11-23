package br.com.avalia.repository;

import br.com.avalia.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    
    List<ClassEntity> findBySemester(String semester);
    
    List<ClassEntity> findByDisciplineId(Long disciplineId);
    
    List<ClassEntity> findBySemesterAndShift(String semester, String shift);
}
