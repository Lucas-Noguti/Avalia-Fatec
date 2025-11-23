package br.com.avalia.repository;

import br.com.avalia.entity.DisciplineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DisciplineRepository extends JpaRepository<DisciplineEntity, Long> {
    
    Optional<DisciplineEntity> findByName(String name);
    
    Optional<DisciplineEntity> findByCode(String code);
    
    boolean existsByName(String name);
    
    boolean existsByCode(String code);
}
