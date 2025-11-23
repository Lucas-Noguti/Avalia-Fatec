package br.com.avalia.dto;

import br.com.avalia.entity.ProfessorEntity.ProfessorRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class ProfessorDTO {
    
    private Long id;
    
    @NotBlank(message = "O nome é obrigatório")
    private String name;
    
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;
    
    private String phone;
    
    private List<Long> disciplineIds;
    
    private List<String> disciplineNames;
    
    @NotNull(message = "O papel é obrigatório")
    @Builder.Default
    private ProfessorRole role = ProfessorRole.PROFESSOR;
    
    @Builder.Default
    private Boolean active = true;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
