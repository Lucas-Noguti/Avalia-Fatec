package br.com.avalia.service;

import br.com.avalia.dto.QuestionDTO;
import br.com.avalia.entity.QuestionEntity;
import br.com.avalia.entity.QuestionEntity.DifficultyLevel;
import br.com.avalia.entity.QuestionEntity.QuestionType;
import br.com.avalia.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    private final ModelMapper modelMapper;
    
    @Transactional(readOnly = true)
    public List<QuestionDTO> findAll() {
        return questionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public QuestionDTO findById(Long id) {
        QuestionEntity entity = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Questão não encontrada com ID: " + id));
        return convertToDTO(entity);
    }
    
    @Transactional(readOnly = true)
    public List<QuestionDTO> findByFilters(String subject, QuestionType type, DifficultyLevel difficulty, String keyword) {
        return questionRepository.findByFilters(subject, type, difficulty, keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public QuestionDTO create(QuestionDTO dto) {
        QuestionEntity entity = convertToEntity(dto);
        entity = questionRepository.save(entity);
        return convertToDTO(entity);
    }
    
    @Transactional
    public QuestionDTO update(Long id, QuestionDTO dto) {
        QuestionEntity entity = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Questão não encontrada com ID: " + id));
        
        entity.setStatement(dto.getStatement());
        entity.setType(dto.getType());
        entity.setOptions(dto.getOptions());
        entity.setCorrectAnswer(dto.getCorrectAnswer());
        entity.setSubject(dto.getSubject());
        entity.setTopic(dto.getTopic());
        entity.setDifficulty(dto.getDifficulty());
        entity.setPoints(dto.getPoints());
        
        entity = questionRepository.save(entity);
        return convertToDTO(entity);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Questão não encontrada com ID: " + id);
        }
        questionRepository.deleteById(id);
    }
    
    private QuestionDTO convertToDTO(QuestionEntity entity) {
        return modelMapper.map(entity, QuestionDTO.class);
    }
    
    private QuestionEntity convertToEntity(QuestionDTO dto) {
        return modelMapper.map(dto, QuestionEntity.class);
    }
}
