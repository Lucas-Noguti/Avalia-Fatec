package br.com.avalia.controller;

import br.com.avalia.dto.QuestionDTO;
import br.com.avalia.entity.QuestionEntity.DifficultyLevel;
import br.com.avalia.entity.QuestionEntity.QuestionType;
import br.com.avalia.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuestionController {
    
    private final QuestionService questionService;
    
    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        return ResponseEntity.ok(questionService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.findById(id));
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<QuestionDTO>> filterQuestions(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) QuestionType type,
            @RequestParam(required = false) DifficultyLevel difficulty,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(questionService.findByFilters(subject, type, difficulty, keyword));
    }
    
    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@Valid @RequestBody QuestionDTO dto) {
        log.info("Recebendo requisição para criar questão: {}", dto);
        try {
            QuestionDTO created = questionService.create(dto);
            log.info("Questão criada com sucesso: ID {}", created.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            log.error("Erro ao criar questão", e);
            throw e;
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionDTO dto
    ) {
        return ResponseEntity.ok(questionService.update(id, dto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
