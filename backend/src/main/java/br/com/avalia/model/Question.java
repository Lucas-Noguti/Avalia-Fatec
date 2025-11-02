package br.com.avalia.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private Long id;
    private String statement;
    private QuestionType type;
    private List<String> options;
    private String correctAnswer;
    private String subject;
    private String topic;
    private DifficultyLevel difficulty;
    private Double points;
    
    public enum QuestionType {
        MULTIPLE_CHOICE,
        TRUE_FALSE,
        ESSAY,
        SHORT_ANSWER
    }
    
    public enum DifficultyLevel {
        EASY,
        MEDIUM,
        HARD
    }
}
