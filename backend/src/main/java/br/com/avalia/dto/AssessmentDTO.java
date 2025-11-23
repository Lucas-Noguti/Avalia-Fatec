package br.com.avalia.dto;

import br.com.avalia.entity.AssessmentEntity.AssessmentStatus;
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
public class AssessmentDTO {
    
    private Long id;
    
    @NotBlank(message = "O título é obrigatório")
    private String title;
    
    @NotBlank(message = "O curso é obrigatório")
    private String course;
    
    private String professor;
    
    private String institution;
    
    private String semester;
    
    private LocalDateTime examDate;
    
    @Positive(message = "A duração deve ser positiva")
    private Integer durationMinutes;
    
    private String instructions;
    
    private List<Long> questionIds;
    
    private List<QuestionDTO> questions;
    
    @NotNull(message = "A pontuação total é obrigatória")
    @Positive(message = "A pontuação total deve ser positiva")
    private Double totalPoints;
    
    @Builder.Default
    private Boolean showAnswers = false;
    
    @Builder.Default
    private AssessmentStatus status = AssessmentStatus.DRAFT;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
