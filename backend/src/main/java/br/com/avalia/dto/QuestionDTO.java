package br.com.avalia.dto;

import br.com.avalia.entity.QuestionEntity.DifficultyLevel;
import br.com.avalia.entity.QuestionEntity.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    
    private Long id;
    
    @NotBlank(message = "O enunciado é obrigatório")
    private String statement;
    
    @NotNull(message = "O tipo de questão é obrigatório")
    private QuestionType type;
    
    private List<String> options;
    
    private String correctAnswer;
    
    @NotBlank(message = "A matéria é obrigatória")
    private String subject;
    
    private String topic;
    
    @NotNull(message = "O nível de dificuldade é obrigatório")
    private DifficultyLevel difficulty;
    
    @NotNull(message = "A pontuação é obrigatória")
    @Positive(message = "A pontuação deve ser positiva")
    private Double points;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
