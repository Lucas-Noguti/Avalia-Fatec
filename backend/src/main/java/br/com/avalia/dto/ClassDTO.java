package br.com.avalia.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassDTO {
    
    private Long id;
    
    @NotBlank(message = "O nome é obrigatório")
    private String name;
    
    @NotBlank(message = "O semestre é obrigatório")
    private String semester;
    
    private String shift;
    
    private Long disciplineId;
    
    private String disciplineName;
    
    @Positive(message = "O número de alunos deve ser positivo")
    private Integer studentCount;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
