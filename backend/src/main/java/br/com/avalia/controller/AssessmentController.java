package br.com.avalia.controller;

import br.com.avalia.dto.AssessmentDTO;
import br.com.avalia.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AssessmentController {
    
    private final AssessmentService assessmentService;
    
    @GetMapping
    public ResponseEntity<List<AssessmentDTO>> getAllAssessments() {
        return ResponseEntity.ok(assessmentService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AssessmentDTO> getAssessmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.findById(id));
    }
    
    @PostMapping
    public ResponseEntity<AssessmentDTO> createAssessment(@Valid @RequestBody AssessmentDTO dto) {
        AssessmentDTO created = assessmentService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<AssessmentDTO> updateAssessment(
            @PathVariable Long id,
            @Valid @RequestBody AssessmentDTO dto
    ) {
        return ResponseEntity.ok(assessmentService.update(id, dto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessment(@PathVariable Long id) {
        assessmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
