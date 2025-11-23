package br.com.avalia.service;

import br.com.avalia.dto.AssessmentDTO;
import br.com.avalia.dto.QuestionDTO;
import br.com.avalia.entity.AssessmentEntity;
import br.com.avalia.entity.QuestionEntity;
import br.com.avalia.repository.AssessmentRepository;
import br.com.avalia.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssessmentService {
    
    private final AssessmentRepository assessmentRepository;
    private final QuestionRepository questionRepository;
    private final ModelMapper modelMapper;
    
    @Transactional(readOnly = true)
    public List<AssessmentDTO> findAll() {
        return assessmentRepository.findAllOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public AssessmentDTO findById(Long id) {
        AssessmentEntity entity = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Avaliação não encontrada com ID: " + id));
        return convertToDTOWithQuestions(entity);
    }
    
    @Transactional
    public AssessmentDTO create(AssessmentDTO dto) {
        AssessmentEntity entity = new AssessmentEntity();
        updateEntityFromDTO(entity, dto);
        entity = assessmentRepository.save(entity);
        return convertToDTO(entity);
    }
    
    @Transactional
    public AssessmentDTO update(Long id, AssessmentDTO dto) {
        AssessmentEntity entity = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Avaliação não encontrada com ID: " + id));
        updateEntityFromDTO(entity, dto);
        entity = assessmentRepository.save(entity);
        return convertToDTO(entity);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!assessmentRepository.existsById(id)) {
            throw new RuntimeException("Avaliação não encontrada com ID: " + id);
        }
        assessmentRepository.deleteById(id);
    }
    
    private void updateEntityFromDTO(AssessmentEntity entity, AssessmentDTO dto) {
        entity.setTitle(dto.getTitle());
        entity.setCourse(dto.getCourse());
        entity.setProfessor(dto.getProfessor());
        entity.setInstitution(dto.getInstitution());
        entity.setSemester(dto.getSemester());
        entity.setExamDate(dto.getExamDate());
        entity.setDurationMinutes(dto.getDurationMinutes());
        entity.setInstructions(dto.getInstructions());
        entity.setTotalPoints(dto.getTotalPoints());
        entity.setShowAnswers(dto.getShowAnswers());
        entity.setStatus(dto.getStatus());
        
        // Atualizar questões
        if (dto.getQuestionIds() != null && !dto.getQuestionIds().isEmpty()) {
            List<QuestionEntity> questions = questionRepository.findAllById(dto.getQuestionIds());
            entity.setQuestions(questions);
        }
    }
    
    private AssessmentDTO convertToDTO(AssessmentEntity entity) {
        AssessmentDTO dto = modelMapper.map(entity, AssessmentDTO.class);
        if (entity.getQuestions() != null) {
            dto.setQuestionIds(entity.getQuestions().stream()
                    .map(QuestionEntity::getId)
                    .collect(Collectors.toList()));
        }
        return dto;
    }
    
    private AssessmentDTO convertToDTOWithQuestions(AssessmentEntity entity) {
        AssessmentDTO dto = convertToDTO(entity);
        if (entity.getQuestions() != null) {
            dto.setQuestions(entity.getQuestions().stream()
                    .map(q -> modelMapper.map(q, QuestionDTO.class))
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}
