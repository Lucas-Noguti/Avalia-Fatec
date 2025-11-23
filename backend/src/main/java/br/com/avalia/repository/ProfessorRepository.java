package br.com.avalia.repository;

import br.com.avalia.entity.ProfessorEntity;
import br.com.avalia.entity.ProfessorEntity.ProfessorRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<ProfessorEntity, Long> {
    
    Optional<ProfessorEntity> findByEmail(String email);
    
    List<ProfessorEntity> findByRole(ProfessorRole role);
    
    List<ProfessorEntity> findByActiveTrue();
    
    boolean existsByEmail(String email);
}
